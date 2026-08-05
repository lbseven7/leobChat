import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/escala-de-cinzas.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc.fontSize(28).fillColor(dark).font("Helvetica-Bold").text("Escala de Cinzas", { align: "center" });
doc.fontSize(12).fillColor(orange).text("Guia Completo de 11 Valores", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// O que é
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("O que é a Escala de Cinzas?");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A escala de cinzas é um conjunto ordenado de 11 valores que vão do branco puro ao preto absoluto. Cada valor representa um nível de luminosidade distinto. Essa escala é a base de toda pintura realista, pois todo objeto que pintamos pode ser decomposto nesses 11 valores.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Na pintura, dominar a escala de cinzas significa dominar a estrutura tonal da obra. Uma pintura com valores bem distribuídos funciona visualmente, mesmo antes de receber cores.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Os 11 valores
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Os 11 Valores da Escala");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A escala é composta por 11 valores numerados de 0 a 10. O valor 0 é o branco puro (100% branco de titânio) e o valor 10 é o preto puro (100% negro de marfim). Os valores intermediários são obtidos misturando branco e preto em proporções decrescentes de branco.",
  { lineGap: 4 }
);

doc.moveDown(0.5);

const valores = [
  { v: 0, nome: "Branco Puro", desc: "100% branco de titânio (PW6). Usado para altas luzes e reflexos mais intensos." },
  { v: 1, nome: "Cinza Claro 1", desc: "9 partes branco : 1 parte preto. Primeiro tom fora do branco puro." },
  { v: 2, nome: "Cinza Claro 2", desc: "8 partes branco : 2 partes preto. Luzes suaves em peles claras." },
  { v: 3, nome: "Cinza Claro 3", desc: "7 partes branco : 3 partes preto. Meios-tons claros em superfícies iluminadas." },
  { v: 4, nome: "Cinza Médio Claro", desc: "6 partes branco : 4 partes preto. Transição entre luz e sombra." },
  { v: 5, nome: "Cinza Médio", desc: "5 partes branco : 5 partes preto. O ponto neutro da escala." },
  { v: 6, nome: "Cinza Médio Escuro", desc: "4 partes branco : 6 partes preto. Início das sombras em muitas superfícies." },
  { v: 7, nome: "Cinza Escuro 1", desc: "3 partes branco : 7 partes preto. Sombras profundas em peles e tecidos." },
  { v: 8, nome: "Cinza Escuro 2", desc: "2 partes branco : 8 partes preto. Sombras intensas, dobras escuras." },
  { v: 9, nome: "Cinza Escuro 3", desc: "1 parte branco : 9 partes preto. Próximo ao preto absoluto." },
  { v: 10, nome: "Preto Puro", desc: "100% negro de marfim (PBk9). Usado com moderação para aprofundar sombras." },
];

valores.forEach(({ v, nome, desc }) => {
  doc.fontSize(10).fillColor(orange).font("Helvetica-Bold").text(`Valor ${v} — ${nome}`);
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(desc);
  doc.moveDown(0.3);
});

doc.moveDown(0.5);

// Proporções de mistura
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Proporções de Mistura");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Para obter cada valor, misture branco de titânio e negro de marfim nas seguintes proporções:",
  { lineGap: 4 }
);
doc.moveDown(0.3);

const misturas = [
  "Valor 0: 100% branco",
  "Valor 1: 9 branco + 1 preto",
  "Valor 2: 8 branco + 2 preto",
  "Valor 3: 7 branco + 3 preto",
  "Valor 4: 6 branco + 4 preto",
  "Valor 5: 5 branco + 5 preto (meio neutro)",
  "Valor 6: 4 branco + 6 preto",
  "Valor 7: 3 branco + 7 preto",
  "Valor 8: 2 branco + 8 preto",
  "Valor 9: 1 branco + 9 preto",
  "Valor 10: 100% preto",
];

misturas.forEach(m => {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  ${m}`, { indent: 10 });
});

doc.moveDown(1);

// Pigmentos
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Pigmentos de Referência");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Branco de Titânio (PW6): O branco mais opaco e utilizado em pintura. Cobertura máxima e neutralidade de tom.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Negro de Marfim (PBk9): Preto neutro e levemente amadeirado. Não puxa a mistura para o azul ou marrom como outros pretos.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Alternativas: Branco de Zinco (PW4) é mais transparente e frio. Preto Marte (PBk11) é opaco levemente avermelhado. Negro Fumo (PBk6/7) é muito intenso e frio.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Dicas
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Dicas de Mistura");
doc.moveDown(0.5);

const dicas = [
  "Comece sempre com a cor mais clara (branco) e adicione o preto aos poucos.",
  "Use uma espátula limpa para cada mistura — contaminação altera o valor.",
  "Teste o tom sobre um papel branco para avaliar corretamente.",
  "O olho se adapta rapidamente: observe cada mistura por no máximo 5 segundos.",
  "Prepare todos os 11 valores de uma vez para ter a escala completa.",
];

dicas.forEach(d => {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  - ${d}`, { indent: 10 });
});

doc.moveDown(2);

doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Tono — Escala e Valor Tonal para Artistas", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: escala-de-cinzas.pdf");
});
