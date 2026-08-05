import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/exercicios-praticos.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc.fontSize(28).fillColor(dark).font("Helvetica-Bold").text("Exercícios Práticos", { align: "center" });
doc.fontSize(12).fillColor(orange).text("Treine sua Percepção de Valores", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// Introdução
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Por que Praticar?");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A percepção de valores não é inata — é treinável. Assim como um músico afina o ouvido, um artista pode afinar o olhar. Estes exercícios progressivos vão desenvolver sua capacidade de enxergar e reproduzir valores com precisão.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Nível 1
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Nível 1 — Fundamentos (Semanas 1-2)");
doc.moveDown(0.5);

doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 1: Montar a Escala");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Prepare os 11 valores da escala de cinzas em sua paleta. Compare cada valor com uma referência impressa. Ajuste até que todos correspondam. Repita diariamente até conseguir preparar a escala rapidamente e com precisão.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 2: Classificar Valores");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Escolha 5 objetos de sua casa (uma xícara branca, uma caneta preta, etc.). Classifique cada um em um valor da escala de 0 a 10. Compare sua classificação com uma foto em preto e branco dos objetos.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 3: Quadrados de Valor");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Desenhe uma grade de 3x3 quadrados no papel. Pinte cada quadrado com um valor diferente da escala. O objetivo é que as diferenças entre quadrados adjacentes sejam uniformes e claras.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Nível 2
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Nível 2 — Intermediário (Semanas 3-4)");
doc.moveDown(0.5);

doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 4: Esfera em Cinza");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Pinte uma esfera usando apenas valores da escala de cinzas. Identifique: highlight (valor 0-1), luz (2-3), meios-tons (4-6), sombra (7-8), sombra refletida (6-7) e projeção (9-10).",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 5: Cópia em PB");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Escolha uma foto em preto e branco de um objeto simples. Copie usando apenas valores de cinza. Compare lado a lado com a referência. Identifique onde seus valores estão errados e corrija.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 6: Contraste Mínimo");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Pinte um objeto usando apenas 2 valores consecutivos da escala (ex: valor 4 e valor 5). Isso treina sua capacidade de enxergar diferenças sutis de valor.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Nível 3
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Nível 3 — Avançado (Semanas 5-8)");
doc.moveDown(0.5);

doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 7: Still Life em Cinza");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Monte uma composição com 3-5 objetos de valores diferentes. Pinte toda a composição em escala de cinzas, sem cores. Foque na relação entre os valores dos objetos e do fundo.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 8: Conversão Colorida");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Escolha uma foto colorida. Primeiro, faça a subpintura em escala de cinzas. Depois, adicione camadas de cor sobre a subpintura. Compare o resultado com a foto original.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 9: Velocidade");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Pinte o mesmo objeto 3 vezes: em 30 minutos, em 15 minutos e em 5 minutos. Isso treina sua capacidade de identificar os valores mais importantes rapidamente.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Exercício 10: Memória");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Observe um objeto por 30 segundos. Vire as costas e pinte-o de memória usando apenas valores. Compare com a referência. Isso desenvolve sua memória visual de valores.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Dicas
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Dicas para Todos os Níveis");
doc.moveDown(0.5);

const dicas = [
  "Pratique pelo menos 15 minutos por dia. Consistência é mais importante que duração.",
  "Use sempre uma referência. Nunca pinte de imaginação no início.",
  "Tire fotos em PB do seu trabalho para avaliar valores com precisão.",
  "Não tenha medo de errar. Cada erro é uma lição sobre percepção.",
  "Compare seu trabalho com artistas que admira. Identifique o que eles fazem diferente com valores.",
];

dicas.forEach(d => {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  - ${d}`, { indent: 10 });
});

doc.moveDown(2);

doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Tono — Escala e Valor Tonal para Artistas", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: exercicios-praticos.pdf");
});
