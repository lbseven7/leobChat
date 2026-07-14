import fs from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "questions.json");

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function readLogs() {
  ensureLogDir();
  if (!fs.existsSync(LOG_FILE)) {
    return [];
  }
  const data = fs.readFileSync(LOG_FILE, "utf8");
  return JSON.parse(data);
}

function writeLogs(logs) {
  ensureLogDir();
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

async function sendToGoogleSheets(entry) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    return false;
  }

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
  if (req.method === "GET") {
    const logs = readLogs();
    return res.status(200).json({ logs, total: logs.length });
  }

  if (req.method === "POST") {
    const { question, answer, threadId, source } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "question e answer são obrigatórios" });
    }

    const unanswered = answer.includes("não está nos meus materiais");

    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString(),
      question,
      answer,
      unanswered,
      threadId: threadId || null,
      source: source || "chat",
    };

    const logs = readLogs();
    logs.push(entry);
    writeLogs(logs);

    await sendToGoogleSheets(entry);

    return res.status(200).json({ success: true, id: entry.id });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
