import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/catalogo-obras.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc
  .fontSize(28)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Catálogo de Obras", { align: "center" });

doc
  .fontSize(12)
  .fillColor(orange)
  .text("Leo Barbosa - Séries Limitadas Fine Art", { align: "center" });

doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

const obras = [
  {
    titulo: "Casa de Vaqueiro",
    tecnica: "Impressão de Qualidade Museológica com Pigmentos Minerais",
    suporte: "Papel Ultra Smooth",
    dimensoes: "20 x 28 cm",
    valor: "R$ 1.200,00",
    valorUSD: "$ 240",
    edicoes: 30,
    disponiveis: 30,
    descricao:
      "Obra que retrata a essência do sertão baiano, capturando a arquitetura simples e cheia de história das casas de vaqueiro. Impressão de qualidade museológica com pigmentos minerais sobre papel Ultra Smooth, garantindo cores vibrantes e durabilidade superior.",
  },
  {
    titulo: "Ela e Seu Cavalo",
    tecnica: "Impressão de Qualidade Museológica com Pigmentos Minerais",
    suporte: "Papel Ultra Smooth",
    dimensoes: "27,9 x 42 cm",
    valor: "R$ 1.800,00",
    valorUSD: "$ 360",
    edicoes: 30,
    disponiveis: 30,
    descricao:
      "Uma obra que celebra a conexão entre a cavaleira e seu cavalo, capturando emoção e movimento com precisão hiper-realista. Impressão de qualidade museológica com pigmentos minerais sobre papel Ultra Smooth de alta gramatura, garantindo durabilidade e riqueza de detalhes.",
  },
];

obras.forEach((obra, i) => {
  if (i > 0) {
    doc.addPage();
  }

  doc
    .fontSize(20)
    .fillColor(dark)
    .font("Helvetica-Bold")
    .text(obra.titulo);

  doc
    .fontSize(9)
    .fillColor(orange)
    .font("Helvetica-Bold")
    .text(`SÉRIE LIMITADA: ${obra.disponiveis} DE ${obra.edicoes} DISPONÍVEIS`, {
      continued: false,
    });

  doc.moveDown(0.5);

  const tableX = 50;
  const labelW = 140;
  const valueW = 200;

  const rows = [
    ["Técnica", obra.tecnica],
    ["Suporte", obra.suporte],
    ["Dimensões", obra.dimensoes],
    ["Valor (BR)", obra.valor],
    ["Valor (USD)", obra.valorUSD],
    ["Edições Totais", String(obra.edicoes)],
    ["Disponíveis", String(obra.disponiveis)],
  ];

  const startY = doc.y;

  rows.forEach((row, idx) => {
    const y = startY + idx * 22;
    const bg = idx % 2 === 0 ? "#f5f5f5" : "#ffffff";

    doc.rect(tableX, y, labelW + valueW, 20).fill(bg);

    doc
      .fontSize(9)
      .fillColor("#888888")
      .font("Helvetica")
      .text(row[0], tableX + 8, y + 5, { width: labelW - 10 });

    doc
      .fontSize(10)
      .fillColor(dark)
      .font("Helvetica-Bold")
      .text(row[1], tableX + labelW + 5, y + 5, { width: valueW - 10 });
  });

  doc.y = startY + rows.length * 22 + 20;

  doc
    .fontSize(9)
    .fillColor("#666666")
    .font("Helvetica")
    .text("Descrição:", { underline: true });

  doc.moveDown(0.3);

  doc
    .fontSize(10)
    .fillColor(dark)
    .font("Helvetica")
    .text(obra.descricao, { lineGap: 4 });

  doc.moveDown(1);

  doc
    .fontSize(9)
    .fillColor(orange)
    .font("Helvetica-Bold")
    .text(
      "Para adquirir ou consultar disponibilidade, entre em contato via WhatsApp: +55 73 98827-9832",
      { width: 500 }
    );
});

doc.moveDown(2);
doc
  .fontSize(8)
  .fillColor("#aaaaaa")
  .font("Helvetica")
  .text("© 2026 Leo Barbosa - leobarbosa.art", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: catalogo-obras.pdf");
});
