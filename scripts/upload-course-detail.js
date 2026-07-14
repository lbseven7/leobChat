import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID;

async function uploadCourseDetail() {
  console.log("Fazendo upload do PDF detalhado do curso...");

  const file = await openai.files.create({
    file: fs.createReadStream("../pdfs/curso-efeito-metalico.pdf"),
    purpose: "assistants",
  });

  console.log("Arquivo uploaded:", file.id);

  console.log("Adicionando ao vector store...");
  await openai.vectorStores.files.create(VECTOR_STORE_ID, {
    file_id: file.id,
  });

  console.log("Pronto! PDF detalhado do curso adicionado ao vector store:", VECTOR_STORE_ID);
}

uploadCourseDetail().catch(console.error);
