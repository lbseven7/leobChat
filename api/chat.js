import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function stripCitations(text) {
  return text.replace(/【[^】]*】/g, "").trim();
}

async function getGoogleAccessToken(serviceAccountEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600;

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: expiry,
  };

  const base64url = (obj) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const headerB64 = base64url(header);
  const payloadB64 = base64url(payload);
  const signingInput = `${headerB64}.${payloadB64}`;

  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signingInput);
  sign.end();
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${signingInput}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function sendToGoogleSheets(entry) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) return;

  try {
    const accessToken = await getGoogleAccessToken(
      serviceAccountEmail,
      privateKey.replace(/\\n/g, "\n")
    );

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Logs!A:F:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      }
    );
  } catch (error) {
    console.error("Erro ao enviar para Google Sheets:", error.message);
  }
}

function logQuestion(message, reply, threadId) {
  const unanswered = reply.includes("não está nos meus materiais");

  const entry = {
    timestamp: new Date().toISOString(),
    question: message,
    answer: reply,
    unanswered,
    threadId: threadId || "",
    source: "chat",
  };

  sendToGoogleSheets(entry).catch(() => {});
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

    logQuestion(message, reply, response.conversation || threadId);

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
