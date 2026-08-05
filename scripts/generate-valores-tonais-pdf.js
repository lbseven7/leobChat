import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/valores-tonais.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc.fontSize(28).fillColor(dark).font("Helvetica-Bold").text("Valores Tonais", { align: "center" });
doc.fontSize(12).fillColor(orange).text("A Base de Toda Pintura", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// O que é valor tonal
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("O que é Valor Tonal?");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Valor tonal é o grau de luminosidade ou escuridão de uma cor. É uma das propriedades fundamentais da cor, ao lado de matiz e saturação. Na pintura, o valor é mais importante que a cor em si, porque é o valor que cria a ilusão de forma, profundidade e volume.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Uma pintura feita apenas com valores corretos já transmite tridimensionalidade. Quando adicionamos cores sobre essa estrutura tonal, o resultado é uma obra realista e convincente.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Por que é importante
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Por que o Valor é a Base da Pintura?");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "1. Cria forma e volume: Valores corretos transformam um círculo plano em uma esfera tridimensional.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "2. Estabelece profundidade: Objetos mais distantes tendem a ter menos contraste de valor (atmosfera).",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "3. Direciona o olhar: Contrastes de valor atraem a atenção do observador para pontos específicos.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "4. Cria atmosfera e mood: Uma pintura com valores altos (claros) transmite luminosidade; com valores baixos (escuros), transmite dramaticidade.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Como o olho percebe valores
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Como o Olho Percebe Valores");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "O olho humano percebe valores de forma relativa, não absoluta. Um mesmo cinza pode parecer claro sobre um fundo escuro e escuro sobre um fundo claro. Isso se chama contraste simultâneo.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Por isso, na pintura, não pintamos o valor 'absoluto' de um objeto, mas sim o valor 'relativo' em comparação com os objetos ao redor. Essa é uma das habilidades mais importantes que um artista pode desenvolver.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Adaptação do olho
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Adaptação do Olho");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "O olho se adapta rapidamente à luminosidade do ambiente. Isso significa que se você ficar olhando para um objeto escuro por muito tempo, seu olho se adapta e começa a enxergar mais detalhes nas sombras. O contrário também acontece.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Para avaliar valores com precisão, observe cada mistura por no máximo 5 segundos e depois desvie o olhar. Isso evita a adaptação e mantém sua referência de valor consistente.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Relação entre valor e cor
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Relação entre Valor e Cor");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Toda cor tem um valor intrínseco. O amarelo, por exemplo, é uma cor com valor naturalmente alto (clara). O azul marinho é uma cor com valor naturalmente baixo (escura). Entender isso é essencial para misturar cores que mantêm a estrutura tonal desejada.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Um truque para avaliar o valor de qualquer cor é tirar a foto em preto e branco. Se a foto em PB mostra a estrutura correta, os valores estão certos.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Erros comuns
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Erros Comuns com Valores");
doc.moveDown(0.5);

const erros = [
  "Pintar o valor que acha que vê, sem comparar com a referência.",
  "Usar apenas preto para escurecer cores, o que desatura e empobrece o tom.",
  "Não ter uma escala de referência preparada antes de começar a pintar.",
  "Confundir saturação com valor (uma cor mais saturada não é necessariamente mais escura).",
  "Pintar sem observar o objeto de referência frequentemente.",
];

erros.forEach(e => {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(`  - ${e}`, { indent: 10 });
});

doc.moveDown(2);

doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Tono — Escala e Valor Tonal para Artistas", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: valores-tonais.pdf");
});
