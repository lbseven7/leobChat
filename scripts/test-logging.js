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

function testLogging() {
  console.log("=== Teste de Logging ===\n");

  const testEntries = [
    {
      question: "Qual o valor da obra?",
      answer: "Essa informação não está nos meus materiais. Manda uma mensagem pra mim no WhatsApp que te respondo!",
      unanswered: true,
    },
    {
      question: "Como funciona o curso?",
      answer: "O curso tem 3 fases: preparação, aplicação e finalização. Cada fase tem técnicas específicas.",
      unanswered: false,
    },
    {
      question: "Tem desconto?",
      answer: "Essa informação não está nos meus materiais. Manda uma mensagem pra mim no WhatsApp que te respondo!",
      unanswered: true,
    },
  ];

  const logs = readLogs();
  console.log(`Logs existentes: ${logs.length}`);

  testEntries.forEach((entry, i) => {
    const logEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString(),
      question: entry.question,
      answer: entry.answer,
      unanswered: entry.unanswered,
      threadId: null,
      source: "test",
    };
    logs.push(logEntry);
    console.log(`Adicionado teste ${i + 1}: "${entry.question}"`);
  });

  writeLogs(logs);
  console.log(`\nTotal de logs agora: ${logs.length}`);
  console.log("Arquivo salvo em:", LOG_FILE);

  const summary = {
    total: logs.length,
    unanswered: logs.filter((l) => l.unanswered).length,
    answered: logs.filter((l) => !l.unanswered).length,
  };
  console.log("\nResumo:", summary);
}

testLogging();
