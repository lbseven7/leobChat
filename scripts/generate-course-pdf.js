import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/curso-hotmart.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc
  .fontSize(28)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Curso do Professor Leo", { align: "center" });

doc
  .fontSize(12)
  .fillColor(orange)
  .text("Disponível na Hotmart", { align: "center" });

doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

doc
  .fontSize(14)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Como adquirir o curso");

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "O curso do Professor Leo está disponível para compra na plataforma Hotmart, uma das maiores plataformas de cursos online do Brasil.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text("Link de compra:", { lineGap: 4 });

doc.moveDown(0.3);

doc
  .fontSize(12)
  .fillColor(orange)
  .font("Helvetica-Bold")
  .text("https://go.hotmart.com/V106729544D", {
    link: "https://go.hotmart.com/V106729544D",
    underline: true,
  });

doc.moveDown(1);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Para adquirir, basta acessar o link acima, escolher a forma de pagamento e começar a aprender com o Professor Leo.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Se tiver dúvidas sobre o curso, entre em contato via WhatsApp: +55 73 98827-9832",
    { lineGap: 4 }
  );

doc.moveDown(2);

doc
  .fontSize(8)
  .fillColor("#aaaaaa")
  .font("Helvetica")
  .text("© 2026 Leo Barbosa - leobarbosa.art", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: curso-hotmart.pdf");
});
