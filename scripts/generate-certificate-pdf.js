import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ margin: 50, size: "A4" });
const stream = fs.createWriteStream("../pdfs/certificado-colecao-regionalista.pdf");
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

// Title
doc.fontSize(22).fillColor(dark).font("Helvetica-Bold").text("Certificado e Diretriz de Experiência", { align: "center" });
doc.fontSize(14).fillColor(orange).font("Helvetica-Bold").text("Coleção Regionalista", { align: "center" });
doc.fontSize(10).fillColor(dark).font("Helvetica").text("Léo Barbosa — Pintura Original e Fine Art", { align: "center" });
doc.moveDown(0.3);
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(orange).lineWidth(1.5).stroke();
doc.moveDown(0.8);

addText("Este documento define as especificações técnicas de preservação museológica, a narrativa poética que envolve a obra original e suas reproduções oficiais em Fine Art, e as diretrizes de longevidade da peça.");

// Bloco 1
addSection("Bloco 1: Especificações Técnicas e Materiais Fine Art");
addText("Quando você adquire uma obra com a assinatura Léo Barbosa, você não está levando apenas pigmento sobre uma superfície; você está investindo em um patrimônio visual feito para durar séculos sem perder a vivacidade. A escolha de cada material respeita os mais altos critérios de conservação museológica (Fine Art).");

addSubSection("Ficha Técnica de Conservação:");

addSubSection("Impressão com Tinta Pigmentada Mineral");
addText("Diferente das impressões comuns que desbotam com a luz do sol, utilizamos tintas de pigmento mineral à base de água de altíssima fidelidade cromática. Elas garantem que os degradês suaves e as transições tridimensionais da pintura permaneçam intactos por mais de 100 anos.");

addSubSection("Papel Cotton Ultra Smooth (100% Algodão)");
addText("A base da reprodução é um papel fine art feito inteiramente de fibras de algodão, livre de ácidos e alvejantes químicos. Sua textura Ultra Smooth preserva a nitidez microscópica de cada poro, fio e detalhe que foi planejado na pintura original.");

addSubSection("Vidro Art Glass (Classe Museu)");
addText("A obra é protegida por um vidro de engenharia óptica superior. O Art Glass reduz quase a zero os reflexos do ambiente (dando a ilusão de que nem há vidro ali) e bloqueia os raios UV, impedindo o envelhecimento precoce dos pigmentos.");

addSubSection("Moldura Industrial de Alta Linha");
addText("O acabamento final é feito com moldura industrial de perfil contemporâneo e fechamento hermético, estruturada para proteger o papel da umidade do ambiente e garantir a linearidade da peça na parede.");

addSubSection("Exclusividade e Série Limitada");
addText("Cada reprodução faz parte de uma tiragem única e limitada a rigorosamente 30 unidades. Cada peça é numerada, assinada e acompanha este selo de exclusividade. Uma vez atingido o número 30, a matriz é lacrada e a série nunca mais será replicada.");

addSubSection("A Matriz Original");
addText("Todo o processo nasce de uma pintura original, inteiramente pintada à mão pelo artista Léo Barbosa, após meses de observação e refinamento de camadas no ateliê.");

// Bloco 2
addSection("Bloco 2: A Narrativa Poética — O Convite ao Interior");
doc.fontSize(10).fillColor(dark).font("Helvetica-Oblique").text('"Eu não entrego tinta sobre o algodão. Eu entrego uma fresta de janela aberta para o interior da Bahia." — Léo Barbosa');
doc.moveDown(0.5);

addSubSection("A Atmosfera da Obra e a Poesia do Preto e Branco");
addText("Esta coleção encontra sua alma na poesia silenciosa do regionalismo baiano. É o retrato da vida que acontece no tempo certo, longe do barulho ensurdecedor das distrações digitais.");

addText("Neste momento da minha trajetória, a minha grande prioridade e especialidade é a pintura em preto e branco. Eu escolho a ausência de cores pela sua potência poética irresistível e, acima de tudo, para primar pelo ensino e domínio absoluto dos valores tonais na escala de cinzas. Embora eu também preze pelas obras coloridas, este é o momento em que busco aprimorar e ensinar a técnica mais refinada da escala de cinzas aplicada ao hiper-realismo. Retirar a cor nos força a enxergar a luz e a sombra em seu estado mais puro e cru.");

addText("Quando você se posiciona diante da tela, o seu olhar é convidado a caminhar por uma estrada de terra batida desenhada apenas pelo contraste. Ali, na beira do caminho, repousa a casinha de fachada simples, testemunha de tantas histórias guardadas pelo tempo. O sol do interior atinge as paredes, revelando as texturas da terra através de uma rica e meticulosa transição de cinzas, mostrando o relevo do reboco e a poesia da simplicidade.");

addSubSection("O Animal e o Ambiente");
addText("No coração da cena, o bicho. Seja o cavalo que caminha calmo pelo gramado ou a presença viva que molda a paisagem. Ele não é um mero elemento decorativo; ele é o termômetro do ambiente. A precisão hiper-realista aplicada nos pelos, na anatomia e no brilho dos olhos do animal — tudo construído estritamente na escala de cinzas — serve para uma única coisa: provar que a luz correta tem peso, tem volume e tem alma. O contraste cirúrgico te faz sentir a temperatura daquele momento, a calmaria do vento e a luz forte do interior rebatendo na matéria.");

addText("Esta obra é um resgate. Uma experiência emocional em tons de cinza que te puxa pelos pés descalços de volta à infância pura, ao silêncio que cura a ansiedade moderna e à beleza crua das coisas autênticas. Não é para ser apenas vista; é para ser vivida, respirada e estudada todos os dias na parede da sua casa.");

// Bloco 3
addSection("Bloco 3: Diretrizes de Preservação e Exibição");
addText("Orientações essenciais para garantir que o patrimônio visual da obra se mantenha intacto através das gerações.");

addSubSection("Iluminação Ideal");
addText("Embora o vidro Art Glass possua proteção UV e antirreflexo superior, evite expor a obra diretamente à luz solar forte contínua (como fachadas de janelas que recebem sol direto da tarde). Prefira iluminação indireta ou focada com lâmpadas LED frias, que não geram calor sobre a moldura.");

addSubSection("Manuseio Seguro");
addText("Ao retirar a obra para limpeza ou transporte, segure sempre pelas laterais firmes da moldura industrial. Nunca aplique pressão no centro do vidro ou na parte traseira da estrutura para não comprometer o fechamento hermético que protege o papel de algodão.");

addSubSection("Limpeza do Vidro Óptico");
addText("Para manter a transparência perfeita do Art Glass, limpe a superfície apenas com um pano de microfibra macio levemente umedecido em água ou produto específico para lentes e vidros ópticos. Nunca borrife líquidos diretamente no vidro; aplique no pano primeiro para evitar infiltrações nas bordas da moldura.");

addSubSection("Ambientes Recomendados");
addText("Por se tratar de uma estrutura hermética que protege o papel Ultra Smooth 100% algodão, a obra é ideal para salas, escritórios, quartos e áreas comuns. Evite apenas pendurá-la em ambientes com altíssima variação de umidade constante, como banheiros ou saunas.");

doc.moveDown(2);
doc.fontSize(8).fillColor("#aaaaaa").font("Helvetica").text("© 2026 Leo Barbosa - leobarbosa.art", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF gerado: certificado-colecao-regionalista.pdf");
});
