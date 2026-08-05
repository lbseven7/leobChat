import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/guia-de-misturas.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc.fontSize(28).fillColor(dark).font("Helvetica-Bold").text("Guia de Misturas", { align: "center" });
doc.fontSize(12).fillColor(orange).text("Proporções Precisas para Cada Valor Tonal", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// Introdução
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Como Misturar Valores Tonais");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A mistura de valores é uma habilidade que separa artistas iniciantes de experientes. Não basta misturar branco e preto no olho — é preciso ter proporções precisas e um método consistente.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Este guia apresenta as proporções exatas para cada valor da escala de 11 tons, além de técnicas avançadas para refinar suas misturas.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Método de preparação
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Método de Preparação");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "1. Prepare todos os 11 valores de uma vez. Isso garante consistência e evita ter que re-misturar valores durante a pintura.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "2. Comece sempre do branco para o preto. É mais fácil adicionar preto aos poucos do que tentar clarear uma mistura muito escura.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "3. Use uma paleta de vidro ou porcelana. A superfície branca permite avaliar o valor real da mistura.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "4. Misture quantidades suficientes. É melhor sobrar tinta do que faltar e ter que re-misturar.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Tabela de proporções
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Tabela de Proporções");
doc.moveDown(0.5);

const dados = [
  { v: 0, ratio: "100% Branco", uso: "Altas luzes, reflexos especulares" },
  { v: 1, ratio: "9:1 (Branco:Preto)", uso: "Superfícies brancas sombreadas" },
  { v: 2, ratio: "8:2 (Branco:Preto)", uso: "Luzes em pele clara, tecidos claros" },
  { v: 3, ratio: "7:3 (Branco:Preto)", uso: "Meios-tons claros, sombras leves" },
  { v: 4, ratio: "6:4 (Branco:Preto)", uso: "Transição luz-sombra em superfícies médias" },
  { v: 5, ratio: "5:5 (Branco:Preto)",uso: "Ponto neutro, cinza médio" },
  { v: 6, ratio: "4:6 (Branco:Preto)",uso: "Início de sombras em pele e tecidos" },
  { v: 7, ratio: "3:7 (Branco:Preto)",uso: "Sombras profundas, dobras escuras" },
  { v: 8, ratio: "2:8 (Branco:Preto)",uso: "Sombras intensas, contraste forte" },
  { v: 9, ratio: "1:9 (Branco:Preto)",uso: "Próximo ao preto, aprofundamento" },
  { v: 10, ratio: "100% Preto", uso: "Aprofundar sombras (usar com moderação)" },
];

dados.forEach(({ v, ratio, uso }) => {
  doc.fontSize(10).fillColor(orange).font("Helvetica-Bold").text(`Valor ${v}`);
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  Proporção: ${ratio}`);
  doc.fontSize(10).font("Helvetica").text(`  Uso: ${uso}`);
  doc.moveDown(0.3);
});

doc.moveDown(0.5);

// Técnicas avançadas
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Técnicas Avançadas de Mistura");
doc.moveDown(0.5);

doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Mistura Óptica vs. Física");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Mistura física é quando você mistura duas cores na paleta antes de aplicar na tela. Mistura óptica é quando dois pontos de cor adjacentes se misturam no olho do observador. A mistura óptica produz cores mais vibrantes, mas é mais difícil de controlar.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Ajuste de Temperatura");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Misturas de branco e preto podem ter temperatura. Se o preto puxar para o azul (como o Preto de Marfim às vezes faz), adicione uma pitada de ocre amarelo para neutralizar. Se parecer frio demais, um toque de ocre ou siena queimada ajuda.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Erros comuns
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Erros Comuns nas Misturas");
doc.moveDown(0.5);

const erros = [
  "Adicionar preto demais de uma vez — sempre aos poucos.",
  "Não ter uma referência de valor para comparar.",
  "Misturar com a espátula suja — limpe antes de cada mistura.",
  "Não preparar todos os valores antes de começar a pintar.",
  "Usar o mesmo pincel para branco e preto sem limpar.",
  "Esquecer que a tinta seca pode mudar de valor (geralmente escurece um pouco).",
];

erros.forEach(e => {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  - ${e}`, { indent: 10 });
});

doc.moveDown(2);

doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Tono — Escala e Valor Tonal para Artistas", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: guia-de-misturas.pdf");
});
