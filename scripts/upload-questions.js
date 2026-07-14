import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID;

async function uploadQuestions() {
  console.log("Fazendo upload das perguntas estratégicas...");

  const file = await openai.files.create({
    file: fs.createReadStream("../pdfs/perguntas-estrategicas-hiper-realismo.pdf"),
    purpose: "assistants",
  });

  console.log("Arquivo uploaded:", file.id);

  console.log("Adicionando ao vector store...");
  await openai.vectorStores.files.create(VECTOR_STORE_ID, {
    file_id: file.id,
  });

  console.log("Pronto! Perguntas estratégicas adicionadas ao vector store:", VECTOR_STORE_ID);
}

uploadQuestions().catch(console.error);
