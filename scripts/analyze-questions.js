import OpenAI from "openai";
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "logs", "questions.json");
const OUTPUT_DIR = path.join(process.cwd(), "logs");

function readLogs() {
  if (!fs.existsSync(LOG_FILE)) {
    console.log("Nenhum log encontrado. Execute o chat primeiro.");
    return [];
  }
  return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
}

function analyzePatterns(logs) {
  const unanswered = logs.filter((l) => l.unanswered);
  const answered = logs.filter((l) => !l.unanswered);

  const questionFrequency = {};
  logs.forEach((l) => {
    const q = l.question.toLowerCase().trim();
    questionFrequency[q] = (questionFrequency[q] || 0) + 1;
  });

  const frequentQuestions = Object.entries(questionFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  const topics = {};
  unanswered.forEach((l) => {
    const words = l.question.toLowerCase().split(/\s+/);
    words.forEach((w) => {
      if (w.length > 3) {
        topics[w] = (topics[w] || 0) + 1;
      }
    });
  });

  const hotTopics = Object.entries(topics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15);

  return {
    totalQuestions: logs.length,
    totalAnswered: answered.length,
    totalUnanswered: unanswered.length,
    answerRate: ((answered.length / logs.length) * 100).toFixed(1) + "%",
    frequentQuestions,
    hotTopics,
    unansweredQuestions: unanswered.map((l) => ({
      question: l.question,
      timestamp: l.timestamp,
    })),
  };
}

async function generateInsights(analysis) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log("OPENAI_API_KEY não configurada. Pulando geração de insights.");
    return null;
  }

  const openai = new OpenAI({ apiKey });

  const prompt = `Analise as seguintes perguntas de alunos sobre arte, pintura hiper-realista e cursos do Professor Leo.

PERGUNTAS FREQUENTES:
${analysis.frequentQuestions.map(([q, count]) => `- "${q}" (${count}x)`).join("\n")}

PERGUNTAS SEM RESPOSTA (${analysis.totalUnanswered} de ${analysis.totalQuestions}):
${analysis.unansweredQuestions.map((l) => `- "${l.question}"`).join("\n")}

TÓPICOS EM ALTA (palavras mais frequentes nas perguntas sem resposta):
${analysis.hotTopics.map(([topic, count]) => `- ${topic} (${count}x)`).join("\n")}

Gere um relatório conciso com:
1. Resumo das principais dúvidas dos alunos
2. Sugestões de novos materiais para adicionar à base de conhecimento
3. Perguntas que podem indicar problemas no site ou na comunicação
4. Recomendações para melhorar o chatbot

Formato: texto simples, sem markdown.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return response.choices[0].message.content;
}

async function main() {
  console.log("=== Análise de Perguntas do leobChat ===\n");

  const logs = readLogs();
  if (logs.length === 0) return;

  console.log(`Total de perguntas registradas: ${logs.length}\n`);

  const analysis = analyzePatterns(logs);

  console.log("=== ESTATÍSTICAS ===");
  console.log(`Total de perguntas: ${analysis.totalQuestions}`);
  console.log(`Respondidas: ${analysis.totalAnswered}`);
  console.log(`Sem resposta: ${analysis.totalUnanswered}`);
  console.log(`Taxa de resposta: ${analysis.answerRate}\n`);

  console.log("=== PERGUNTAS MAIS FREQUENTES ===");
  analysis.frequentQuestions.forEach(([q, count]) => {
    console.log(`  ${count}x - "${q}"`);
  });

  console.log("\n=== TÓPICOS EM ALTA (sem resposta) ===");
  analysis.hotTopics.forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count}x`);
  });

  console.log("\n=== GERANDO INSIGHTS COM IA ===");
  const insights = await generateInsights(analysis);

  if (insights) {
    const reportPath = path.join(OUTPUT_DIR, `report-${Date.now()}.txt`);
    const report = [
      "=== RELATÓRIO DE ANÁLISE DO LEOBCHAT ===",
      `Data: ${new Date().toISOString()}`,
      "",
      "=== ESTATÍSTICAS ===",
      `Total: ${analysis.totalQuestions}`,
      `Respondidas: ${analysis.totalAnswered}`,
      `Sem resposta: ${analysis.totalUnanswered}`,
      `Taxa de resposta: ${analysis.answerRate}`,
      "",
      "=== INSIGHTS DA IA ===",
      insights,
      "",
      "=== PERGUNTAS SEM RESPOSTA (DETALHES) ===",
      ...analysis.unansweredQuestions.map(
        (l) => `[${l.timestamp}] ${l.question}`
      ),
    ].join("\n");

    fs.writeFileSync(reportPath, report);
    console.log(`\nRelatório salvo em: ${reportPath}`);
  }

  const summaryPath = path.join(OUTPUT_DIR, "analysis-summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(analysis, null, 2));
  console.log(`Resumo salvo em: ${summaryPath}`);
}

main().catch(console.error);
