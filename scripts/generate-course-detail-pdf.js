import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50, size: "A4" });
const stream = fs.createWriteStream("../pdfs/curso-efeito-metalico.pdf");
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

function addSubSection(title) {
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor(dark).font("Helvetica-Bold").text(title);
  doc.moveDown(0.2);
}

function addText(text) {
  doc.fontSize(10).fillColor(dark).font("Helvetica").text(text, { lineGap: 3 });
}

function addQuote(text) {
  doc.fontSize(10).fillColor(dark).font("Helvetica-Oblique").text(`"${text}"`, { lineGap: 3 });
  doc.moveDown(0.3);
}

// Title
doc.fontSize(22).fillColor(dark).font("Helvetica-Bold").text("Curso: Efeito Metálico", { align: "center" });
doc.fontSize(14).fillColor(orange).font("Helvetica-Bold").text("Domine a Pintura Hiper-Realista de Efeito Metálico", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(0.8);

addText("Descubra o método prático que utiliza a observação aguçada para criar reflexos, brilhos e contrastes que 'saltam' da tela.");

// Intro
addSection("Na Mente Sim. Nas Mãos Não.");

addText("Você já tentou pintar metal e o resultado pareceu mais um objeto de plástico fosco do que algo reluzente? Eu sei como é. Durante anos, tentei aprender a criar aqueles efeitos metálicos fantásticos que via em grandes obras, mas batia a cabeça tentando fazer. A teoria parecia distante e nada do que eu tentava funcionava.");

addText("Depois de 20 anos de tentativa e erro, eu descobri que o segredo não está em usar a tinta mais cara, mas em treinar o seu olhar para enxergar o que ninguém vê.");

// Como aprendi
addSection("Como Aprendi a Ver");

addText("Muita gente acha que minha técnica veio de escolas de arte tradicionais. Não. Eu sou autodidata. Mas a verdade é que meu olhar foi treinado correndo pelas ruas do Grajaú, em São Paulo, soltando pipa.");

addText("Enquanto outros meninos apenas brincavam, eu calculava a trajetória do 'mandado', observava o contraste da linha branca contra o céu azul ou nublado, e identificava formas e sombras na velocidade da luz. Sem saber, eu estava praticando os fundamentos da harmonia cromática e do contraste muito antes de pegar num pincel.");

addText("Hoje, trago essa experiência de vida — somada a duas décadas de pintura profissional — para te ensinar a transformar qualquer tela em uma obra hiper realista.");

// Método
addSection("O Método em 3 Fases");

addText("Este não é um curso teórico sobre história da arte. Aqui, eu foco no que funciona. Sem enrolação. Vou te entregar o 'ouro' do meu processo em 3 fases simples:");

addSubSection("Fase 1 - Desenho e Base");
addText("Como capturar as formas principais sem medo de 'perder o risco'.");

addSubSection("Fase 2 - Reforço");
addText("Como aplicar as tintas à óleo e acrílica para ajustar tons e valores de forma precisa.");

addSubSection("Fase 3 - Acabamento");
addText("O segredo de 'cada tom em seu lugar' e da pincelada seca para integrar tons e dar o efeito 'esfumaçado' de hiper-realismo.");

// O que recebe
addSection("O Que Você Recebe");

addText("Acesso à Área de Membros Exclusiva: O passo a passo organizado, onde você pode assistir e pausar quantas vezes precisar.");

addText("Guia de Referência em PDF: Um material complementar para você baixar, imprimir e deixar colado no seu cavalete enquanto pinta.");

addText("Acesso Vitalício: Aprenda no seu ritmo, sem pressa. O curso é seu para sempre.");

// Valor
addSection("O Valor de Entregar Valor");

addText("Por que este valor? Eu poderia cobrar caro por esse conhecimento, mas meu objetivo é que você encurte seu caminho e pare de sofrer com erros que eu mesmo cometi lá atrás.");

addText("Pelo valor de um almoço na rua, você terá acesso a toda a minha experiência, aos meus materiais auxiliares e à minha metodologia testada e aprovada.");

// Link
addSection("Como Adquirir");
addText("O curso está disponível na Hotmart:");
doc.fontSize(11).fillColor(orange).font("Helvetica-Bold").text("https://go.hotmart.com/V106729544D", { link: "https://go.hotmart.com/V106729544D", underline: true });
doc.moveDown(0.5);

// Contato
addSection("Contato");
addText("Em caso de dúvidas, entre em contato via WhatsApp: +55 73 98827-9832");

doc.moveDown(2);
doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Leo Barbosa - leobarbosa.art", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: curso-efeito-metalico.pdf");
});
