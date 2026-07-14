import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50, size: "A4" });
const stream = fs.createWriteStream("../pdfs/perguntas-estrategicas-hiper-realismo.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

function addSection(title) {
  doc.moveDown(0.8);
  doc.fontSize(14).fillColor(orange).font("Helvetica-Bold").text(title);
  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(orange).lineWidth(0.8).stroke();
  doc.moveDown(0.5);
}

function addQuestion(q, desc) {
  doc.moveDown(0.4);
  doc.fontSize(11).fillColor(dark).font("Helvetica-Bold").text(q, { width: 495 });
  doc.moveDown(0.2);
  doc.fontSize(9).fillColor("#666666").font("Helvetica").text(`O que se descobre: ${desc}`, { width: 495 });
  doc.moveDown(0.3);
}

function addText(text) {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(text, { lineGap: 3 });
}

// Title
doc.fontSize(22).fillColor(dark).font("Helvetica-Bold").text("Perguntas para Diagnóstico", { align: "center" });
doc.fontSize(14).fillColor(orange).font("Helvetica-Bold").text("Dores em Hiper-realismo Metálico", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(0.8);

addText("Perguntas estratégicas e diretas para identificar onde artistas travam e onde o material do Professor Leo pode ser a 'ponte' para o próximo nível.");

// Pergunta 1
addSection("1. Desafio Técnico");
addQuestion(
  "Ao pintar superfícies metálicas, qual é o aspecto mais difícil de equilibrar entre o reflexo, a distorção da luz e a transição de cores para que o metal pareça 'real' e não apenas uma pintura brilhante?",
  "Se a dificuldade deles é a teoria da cor, a técnica de pincelada ou a observação de luz."
);

// Pergunta 2
addSection("2. Processo e Tempo");
addQuestion(
  "Quantas vezes você já sentiu que 'perdeu a mão' em um detalhe crucial de brilho ou reflexo e teve que recomeçar aquela parte? Como esse tipo de retrabalho afeta sua produtividade e o prazer de pintar?",
  "A dor da frustração e a ineficiência. Se eles perdem muito tempo tentando acertar um brilho, o guia que promete 'velocidade' se torna essencial."
);

// Pergunta 3
addSection("3. Resultado Esperado");
addQuestion(
  "Quando você termina uma obra metálica, o que você mais ouve ou espera ouvir das pessoas (o 'UAU')? Existe algum detalhe específico que você sente que, se ficasse melhor, elevaria o nível de reconhecimento do seu trabalho?",
  "O valor percebido e a validação social. Isso ajuda a vender o guia como a ferramenta que traz o 'reconhecimento' que eles buscam."
);

// Pergunta 4
addSection("4. Lacuna de Conhecimento");
addQuestion(
  "Existe algum segredo ou técnica específica que você gostaria que alguém tivesse te ensinado logo no início, que teria encurtado drasticamente o tempo que você levou para dominar o realismo metálico?",
  "O 'pulo do gato'. Isso dá argumentos de marketing poderosos sobre o que o guia entrega de valor único."
);

// Pergunta 5
addSection("5. Obstáculo Emocional");
addQuestion(
  "Qual é o maior medo ou insegurança que surge quando você começa a pintar uma área de metal complexa em uma tela grande? É o medo de errar o tom, de a luz ficar plana ou de não passar a sensação de rigidez do material?",
  "A barreira psicológica. Se o guia promete um método 'tranquilo', ele resolve diretamente essa insegurança."
);

// Conclusão
addSection("Aplicação no Curso");
addText("Estas perguntas ajudam a identificar os pontos de dor dos artistas e posicionam o curso do Professor Leo como a solução ideal para superar esses obstáculos técnicos e emocionais no hiper-realismo metálico.");

doc.moveDown(2);
doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Leo Barbosa - leobarbosa.art", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: perguntas-estrategicas-hiper-realismo.pdf");
});
