import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/percepcao-visual.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc.fontSize(28).fillColor(dark).font("Helvetica-Bold").text("Percepção Visual", { align: "center" });
doc.fontSize(12).fillColor(orange).text("Como o Olho Vê Valores e Cores", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// Introdução
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Entendendo a Percepção Visual");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "O olho humano não é uma câmera. Ele interpreta, compara e adapta. Entender como enxergamos é essencial para pintar com precisão, porque a pintura é um jogo de percepção.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Como artistas, precisamos aprender a ver valores de forma objetiva, superando as distorções que nosso cérebro naturalmente produz.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Contraste simultâneo
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Contraste Simultâneo");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "O contraste simultâneo é o fenômeno onde uma mesma cor parece diferente dependendo da cor ao redor. Um cinza médio parece mais claro quando cercado de preto e mais escuro quando cercado de branco.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Na pintura, isso significa que nunca devemos avaliar uma cor isoladamente. Sempre compare com as cores vizinhas. Um erro comum é escurecer uma área que já está escura porque parece clara ao lado de algo ainda mais escuro.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Ilusões de óptica
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Ilusões de Óptica no Valor");
doc.moveDown(0.5);

doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Ilusão de Adaptação");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Quando você olha para uma área escura por muito tempo, seus receptores de luz se adaptam e a área começa a parecer mais clara do que realmente é. Isso faz com que você pinte valores mais escuros do que deveria.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Ilusão de Contraste");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Duas faixas cinzas idênticas podem parecer diferentes quando cercadas por valores opostos. Isso é o cérebro amplificando as bordas para nos ajudar a detectar formas — mas atrapalha na hora de avaliar valores.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Como superar distorções
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Como Superar as Distorções");
doc.moveDown(0.5);

const tecnicas = [
  "Use uma referência em preto e branco ao lado da foto colorida.",
  "Tire fotos em PB do seu trabalho em progresso para verificar valores.",
  "Faça o 'teste do blink': pisque os olhos rapidamente e observe o que permanece — isso revela os valores verdadeiros.",
  "Olhe para a referência com um olho fechado e o outro aberto, alternando rapidamente.",
  "Use um visor de valor (um cartão com um furo) para isolar áreas específicas.",
  "Avalie valores por comparação direta, nunca absoluta.",
  "Trabalhe com a mesma iluminação durante toda a pintura.",
];

tecnicas.forEach(t => {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  - ${t}`, { indent: 10 });
});

doc.moveDown(1);

// Adaptação cromática
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Adaptação Cromática");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Assim como o olho se adapta à luminosidade, ele também se adapta às cores. Se você pintar uma área grande de vermelho, o olho começará a enxergar o complemento (verde) nas áreas vizinhas. Isso pode distorcer sua avaliação de cores.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Solução: Objetos de referência neutros (cartões cinza) ajudam a manter o olho calibrado.",
  { lineGap: 4 }
);

doc.moveDown(2);

doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Tono — Escala e Valor Tonal para Artistas", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: percepcao-visual.pdf");
});
