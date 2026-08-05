import OpenAI from "openai";
import fs from "fs";
import path from "path";

const envFile = fs.readFileSync("../.env", "utf8");
for (const line of envFile.split("\n")) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const openai = new OpenAI();

const PDF_DIR = "../pdfs";

const TONO_PDFS = [
  "escala-de-cinzas.pdf",
  "valores-tonais.pdf",
  "tecnicas-de-pintura.pdf",
  "guia-de-misturas.pdf",
  "percepcao-visual.pdf",
  "exercicios-praticos.pdf",
];

async function main() {
  console.log("=== Setup Tono - Vector Store ===\n");

  const available = fs.readdirSync(PDF_DIR).filter(f => f.endsWith(".pdf"));
  const toUpload = TONO_PDFS.filter(f => available.includes(f));

  if (toUpload.length === 0) {
    console.log("Nenhum PDF do Tono encontrado na pasta ../pdfs/");
    console.log("Rode primeiro os scripts de geração de PDF.");
    return;
  }

  console.log(`Encontrados ${toUpload.length} arquivo(s) PDF do Tono:\n`);
  toUpload.forEach(f => console.log(`  - ${f}`));
  console.log("");

  console.log("Criando vector store...");
  const vectorStore = await openai.vectorStores.create({
    name: "Tono - Escala e Valor Tonal",
  });
  console.log(`Vector Store ID: ${vectorStore.id}\n`);

  console.log("Fazendo upload dos arquivos...");
  for (const file of toUpload) {
    const filePath = path.join(PDF_DIR, file);
    console.log(`  Enviando ${file}...`);

    const fileObj = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    await openai.vectorStores.files.create(vectorStore.id, {
      file_id: fileObj.id,
    });

    console.log(`  ${file} enviado!`);
  }

  console.log("\nAguardando processamento...");
  let status = "in_progress";
  while (status === "in_progress") {
    await new Promise(r => setTimeout(r, 2000));
    const vs = await openai.vectorStores.retrieve(vectorStore.id);
    status = vs.status;
    process.stdout.write(".");
  }

  console.log("\n\n=== SETUP COMPLETO! ===\n");
  console.log("Adicione esta linha no seu arquivo .env:\n");
  console.log(`VECTOR_STORE_ID_TONO=${vectorStore.id}`);
  console.log("\nDepois reinicie o servidor com: npx vercel dev");
}

main().catch(console.error);
