import OpenAI from "openai";
import fs from "fs";
import path from "path";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function stripCitations(text) {
  return text.replace(/【[^】]*】/g, "").trim();
}

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "questions.json");

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function readLogs() {
  ensureLogDir();
  if (!fs.existsSync(LOG_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeLogs(logs) {
  ensureLogDir();
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

async function logQuestion(question, answer, threadId) {
  const unanswered = answer.includes("não está nos meus materiais");

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    question,
    answer,
    unanswered,
    threadId: threadId || null,
    source: "chat",
  };

  const logs = readLogs();
  logs.push(entry);
  writeLogs(logs);

  await sendToGoogleSheets(entry);

  return entry;
}

async function sendToGoogleSheets(entry) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) return false;

  try {
    const { GoogleAuth } = await import("google-auth-library");
    const { google } = await import("googleapis");

    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Logs!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            entry.timestamp,
            entry.question,
            entry.answer,
            entry.unanswered ? "SIM" : "NAO",
            entry.threadId || "",
            entry.source || "chat",
          ],
        ],
      },
    });

    return true;
  } catch (error) {
    console.error("Erro ao enviar para Google Sheets:", error.message);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, threadId } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem não fornecida" });
    }

    const openai = getOpenAI();
    const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: message,
      instructions: `Você é o Professor Leo (leob), um pintor e professor de artes.
Responda APENAS com base nos materiais fornecidos.

Regras importantes:
- Responda como o próprio Professor Leo falaria, de forma direta e amigável.
- Nunca inclua referências, citações ou códigos como [4:0†source] nas suas respostas.
- Se a pergunta não estiver nos materiais, diga: "Essa informação não está nos meus materiais. Manda uma mensagem pra mim no WhatsApp que te respondo!"
- Nunca invente respostas.
- NUNCA use formatação markdown (sem **negrito**, sem listas com bullets, sem # títulos). Responda sempre em texto simples e corrido, como em uma conversa por WhatsApp.`,
      ...(threadId ? { conversation: threadId } : {}),
      tools: VECTOR_STORE_ID
        ? [
            {
              type: "file_search",
              vector_store_ids: [VECTOR_STORE_ID],
              max_num_results: 5,
            },
          ]
        : [],
    });

    let reply = response.output_text || "";

    if (!reply) {
      for (const item of response.output) {
        if (item.type === "message" && item.content) {
          for (const part of item.content) {
            if (part.type === "output_text") {
              reply = part.text;
              break;
            }
          }
        }
      }
    }

    reply = stripCitations(reply || "Desculpe, não consegui gerar uma resposta.");

    logQuestion(message, reply, response.conversation || threadId).catch((err) =>
      console.error("Erro ao registrar pergunta:", err.message)
    );

    return res.status(200).json({
      reply,
      threadId: response.conversation || threadId,
    });
  } catch (error) {
    console.error("Erro na API:", error);
    return res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
}
