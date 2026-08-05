import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream("../pdfs/tecnicas-de-pintura.pdf");
doc.pipe(stream);

const orange = "#d88800";
const dark = "#1a1a1a";

doc.fontSize(28).fillColor(dark).font("Helvetica-Bold").text("Técnicas de Pintura Realista", { align: "center" });
doc.fontSize(12).fillColor(orange).text("Métodos e Processos para Resultados Concretos", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(565, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(1);

// Introdução
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Introdução");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A pintura realista não é apenas copiar o que se vê. É entender como a luz se comporta, como as formas se organizam e como os valores se relacionam para criar a ilusão de tridimensionalidade em uma superfície plana.",
  { lineGap: 4 }
);
doc.moveDown(0.5);
doc.fontSize(11).font("Helvetica").text(
  "Este guia apresenta as técnicas fundamentais que todo artista realista deve dominar, desde a preparação da tela até as últimas camadas de detalhe.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Método em 3 fases
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("O Método em 3 Fases");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A pintura realista funciona melhor quando dividida em três fases sequenciais. Cada fase tem um objetivo claro e depende da anterior.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Fase 1 — Subpintura (Underpainting)");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A subpintura é a camada inicial que estabelece a estrutura tonal da obra. Pinte toda a tela em escala de cinzas, definindo as formas principais e a distribuição de luz e sombra. Não se preocupe com detalhes — foque nas massas de valor.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Dica: Use uma tintura diluída (umas 30% tinta + 70% solvente) para criar uma camada fina e transparente. Isso permite ajustes fáceis.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Fase 2 — Camadas Intermediárias");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Com a subpintura seca, comece a adicionar camadas de cor. Trabalhe das áreas maiores para as menores. Estabeleça as cores locais dos objetos e comece a refinar as transições de valor.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Nessa fase, use mais tinta e menos solvente. As camadas devem ser mais opacas que a subpintura.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(orange).font("Helvetica-Bold").text("Fase 3 — Detalhes e Acabamento");
doc.moveDown(0.3);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "A última fase é para detalhes finos: reflexos, texturas, bordas e ajustes sutis de valor. Trabalhe com pincéis menores e tinta mais espessa (impasto) nos pontos de maior contraste.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Importante: Nem toda a pintura precisa do mesmo nível de detalhe. Deixe os detalhes mais marcantes para as áreas de foco e mantenha as áreas periféricas mais suaves.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Técnicas de camadas
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Técnicas de Camadas");
doc.moveDown(0.5);

doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Veladura (Glazing)");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Veladura é aplicar uma camada fina e transparente de cor sobre uma camada seca. É usada para modificar o tom, adicionar profundidade e criar efeitos luminosos. A tinta deve estar bem diluída com medium transparente.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Empaste (Impasto)");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Empaste é aplicar tinta espessa, criando textura na superfície. É usado para áreas de alto contraste e pontos de luz. A textura física da tinta reflete a luz de forma diferente, adicionando tridimensionalidade.",
  { lineGap: 4 }
);

doc.moveDown(0.5);
doc.fontSize(12).fillColor(dark).font("Helvetica-Bold").text("Sfumato (Esfumado)");
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Esfumato é a técnica de suavizar transições entre valores até que não haja bordas visíveis. Leonardo da Vinci era mestre nessa técnica. É fundamental para peles e superfícies lisas.",
  { lineGap: 4 }
);

doc.moveDown(1);

// Materiais
doc.fontSize(16).fillColor(dark).font("Helvetica-Bold").text("Materiais e Preparação");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(dark).font("Helvetica").text(
  "Tinta a óleo: Secagem lenta, permite misturas prolongadas. Ideal para realismo.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Tinta acrílica: Secagem rápida, boa para subpinturas e camadas de bloqueio.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Pincéis: Redondos para detalhes, achatados para áreas maiores. Cerdas naturais para óleo, sintéticas para acrílico.",
  { lineGap: 4 }
);
doc.moveDown(0.3);
doc.fontSize(11).font("Helvetica").text(
  "Tela: Pré-primada para uso imediato. Gramatura média (10-12oz) para a maioria dos trabalhos.",
  { lineGap: 4 }
);

doc.moveDown(2);

doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Tono — Escala e Valor Tonal para Artistas", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: tecnicas-de-pintura.pdf");
});
