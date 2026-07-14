import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/sobre-leo-barbosa.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc
  .fontSize(28)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Sobre Leo Barbosa", { align: "center" });

doc
  .fontSize(12)
  .fillColor(orange)
  .text("Artista, Educador e Pintor Hiper-realista", { align: "center" });

doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// Quem é
doc
  .fontSize(16)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Quem é Leo Barbosa");

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Alexsandro Barbosa dos Santos, conhecido como Leo Barbosa, é artista, educador e amante da pintura hiper realista. Com mais de 20 anos de experiência, ele ajuda artistas a alcançarem resultados concretos em sua arte.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Nascido em Jequié (Bahia), passou infância e adolescência em São Paulo, no bairro Grajaú. Lá teve seus primeiros contatos com arte: confeccionava pipas de papel de seda colorido e vivia observando-as no céu. Também rabisquei muros como pichador e frequentou oficinas de pintura em projetos sociais na comunidade.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Quando voltou à Bahia e se mudou para Jaguaquara, estudou no Colégio Pio XII. Esses três anos de ensino médio foram cruciais para selar sua trajetória como artista pintor na cidade.",
    { lineGap: 4 }
  );

doc.moveDown(1);

// Trajetória
doc
  .fontSize(16)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Trajetória Artística");

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Hoje, depois de mais de duas décadas, Leo se dedica a produzir suas obras, ministrar palestras sobre artes, propor projetos culturais em artes visuais e ensinar pessoas a alcançarem as habilidades necessárias para se tornarem artistas de valor.",
    { lineGap: 4 }
  );

doc.moveDown(1);

// Filosofia
doc
  .fontSize(16)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Filosofia sobre Arte");

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    '"O artista é um observador que capta sentimentos em uma realidade, traduz com pincéis e tintas e entrega para que outros possam sentir, reviver e reinterpretar esses sentimentos recontando a história traduzida pela mão do artista."',
    { lineGap: 4 }
  );

doc.moveDown(1);

// Curso
doc
  .fontSize(16)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("O Curso e o Guia");

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Leo é autodidata em desenho e pintura. Aprendeu sozinho, através de anos de tentativa e erro, buscando criar os efeitos fantásticos que tanto apreciava na pintura de outros artistas. Depois de mais de duas décadas, desenvolveu muitos dos efeitos que o encantavam.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Pensando em artistas com histórias semelhantes, ele organizou o conhecimento obtido ao longo do tempo para guiá-los a alcançarem domínio técnico na pintura hiper realista.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(12)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("O que você vai encontrar no curso:");

doc.moveDown(0.3);

const topics = [
  "Foco em tinta a oleo e tinta acrilica",
  "Metodo em 3 fases sequenciais",
  "Treinamento do olhar em escala de cinza",
  "Tecnica 100% pratica",
];

topics.forEach((topic) => {
  doc
    .fontSize(11)
    .fillColor(dark)
    .font("Helvetica")
    .text(`• ${topic}`, { indent: 20 });
});

doc.moveDown(0.5);

doc
  .fontSize(12)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("O Efeito Metalico: O Foco do Primeiro Guia");

doc.moveDown(0.3);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "Leo escolheu comecar pelo efeito metalico porque e um efeito desafiador. E preciso ter conhecimento tecnico previo que muitos artistas ainda nao adquiriram. Ele esta aqui para transmitir tudo que sabe sobre o assunto para que todos crescam tecnica e profissionalmente.",
    { lineGap: 4 }
  );

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text(
    "O curso analisa e pinta um modelo juntos - uma imagem pensada para transmitir as caracteristicas especificas do efeito metalico: luzes, sombras e contrastes tao caracteristicos de metal polido e reluzente.",
    { lineGap: 4 }
  );

doc.moveDown(1);

// Contato
doc
  .fontSize(16)
  .fillColor(dark)
  .font("Helvetica-Bold")
  .text("Contato e Redes Sociais");

doc.moveDown(0.5);

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text("WhatsApp: +55 73 98827-9832");

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text("Instagram: @leob_pinturas");

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text("YouTube: @leobarbosa-art-studio");

doc
  .fontSize(11)
  .fillColor(dark)
  .font("Helvetica")
  .text("Site: leobarbosa.art");

doc.moveDown(2);

doc
  .fontSize(8)
  .fillColor("#aaaaaa")
  .font("Helvetica")
  .text("© 2026 Leo Barbosa - leobarbosa.art", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: sobre-leo-barbosa.pdf");
});
