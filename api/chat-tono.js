import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function stripCitations(text) {
  return text.replace(/【[^】]*】/g, "").trim();
}

function normalizePrivateKey(key) {
  let k = key.trim();
  if (k.startsWith('"') && k.endsWith('"')) k = k.slice(1, -1);
  k = k.replace(/\\n/g, "\n");
  if (!k.includes("\n")) {
    k = k
      .replace(/-----BEGIN PRIVATE KEY-----/g, "-----BEGIN PRIVATE KEY-----\n")
      .replace(/-----END PRIVATE KEY-----/g, "\n-----END PRIVATE KEY-----")
      .replace(/(.{64})/g, "$1\n")
      .replace(/\n\n/g, "\n");
  }
  return k;
}

async function getGoogleAccessToken(serviceAccountEmail, privateKey) {
  const crypto = await import("crypto");
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const base64url = (obj) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const signingInput = `${base64url(header)}.${base64url(payload)}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signingInput);
  sign.end();
  const signature = sign.sign(normalizePrivateKey(privateKey), "base64url");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signingInput}.${signature}`,
  });

  const data = await tokenRes.json();
  if (!data.access_token) {
    throw new Error(`Token error: ${data.error || JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function sendToGoogleSheets(entry) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    throw new Error("Missing Google env vars");
  }

  const accessToken = await getGoogleAccessToken(
    serviceAccountEmail,
    privateKey
  );

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Logs!A2:F:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [
            entry.timestamp,
            entry.question,
            entry.answer,
            entry.unanswered ? "SIM" : "NAO",
            entry.threadId || "",
            entry.source || "tono-chat",
          ],
        ],
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Sheets API error ${res.status}: ${errText}`);
  }

  return { ok: true };
}

const SYSTEM_PROMPTS = {
  pt: `Você é o Professor Leo (leob), artista pintor hiper-realista e educador com mais de 20 anos de experiência.
Responda APENAS com base nos materiais fornecidos sobre escala de cinzas, valores tonais e pintura realista.

Regras importantes:
- Responda como o próprio Professor Leo falaria, de forma direta, didática e amigável.
- Use exemplos práticos quando possível, como proporções de mistura e exercícios.
- Nunca inclua referências, citações ou códigos como [4:0†source] nas suas respostas.
- Se a pergunta não estiver nos materiais, diga: "Essa informação não está nos meus materiais. Manda uma mensagem pra mim no WhatsApp que te respondo!"
- Nunca invente respostas.
- NUNCA use formatação markdown (sem **negrito**, sem listas com bullets, sem # títulos). Responda sempre em texto simples e corrido, como em uma conversa por WhatsApp.
- Se o usuário perguntar sobre suas obras de arte ou curso, mencione que mais informações estão disponíveis em leobchat.vercel.app
- Responda SEMPRE em português.`,
  en: `You are Professor Leo (leob), a hyper-realistic painter and educator with over 20 years of experience.
Answer ONLY based on the provided materials about grayscale, tonal values, and realistic painting.

Important rules:
- Answer as Professor Leo would speak — direct, educational, and friendly.
- Use practical examples when possible, like mixing ratios and exercises.
- Never include references, citations, or codes like [4:0†source] in your responses.
- If the question is not in the materials, say: "That information is not in my materials. Send me a message on WhatsApp and I'll answer you!"
- Never make up answers.
- NEVER use markdown formatting (no **bold**, no bullet lists, no # headings). Always respond in plain text, like a WhatsApp conversation.
- If the user asks about artworks or courses, mention that more information is available at leobchat.vercel.app
- ALWAYS respond in English.`,
  es: `Eres el Profesor Leo (leob), pintor hiper-realista y educador con más de 20 años de experiencia.
Responde SOLO con base en los materiales proporcionados sobre escala de grises, valores tonales y pintura realista.

Reglas importantes:
- Responde como hablaría el Profesor Leo — directo, didáctico y amigable.
- Usa ejemplos prácticos cuando sea posible, como proporciones de mezcla y ejercicios.
- Nunca incluyas referencias, citas o códigos como [4:0†source] en tus respuestas.
- Si la pregunta no está en los materiales, di: "Esa información no está en mis materiales. ¡Envíame un mensaje por WhatsApp y te respondo!"
- Nunca inventes respuestas.
- NUNCA uses formato markdown (sin **negritas**, sin listas con viñetas, sin # títulos). Responde siempre en texto plano, como en una conversación de WhatsApp.
- Si el usuario pregunta sobre obras de arte o cursos, menciona que más información está disponible en leobchat.vercel.app
- Responde SIEMPRE en español.`,
  fr: `Tu es le Professeur Leo (leob), peintre hyperréaliste et éducateur avec plus de 20 ans d'expérience.
Réponds UNIQUEMENT en te basant sur les documents fournis sur l'échelle de gris, les valeurs tonales et la peinture réaliste.

Règles importantes:
- Réponds comme le Professeur Leo parlerait — direct, pédagogique et amical.
- Utilise des exemples pratiques quand c'est possible, comme des proportions de mélange et des exercices.
- N'inclus jamais de références, citations ou codes comme [4:0†source] dans tes réponses.
- Si la question n'est pas dans les documents, dis : "Cette information ne figure pas dans mes documents. Envoie-moi un message sur WhatsApp et je te répondrai !"
- N'invente jamais de réponses.
- N'utilise JAMAIS de formatage markdown (pas de **gras**, pas de listes à puces, pas de # titres). Réponds toujours en texte brut, comme dans une conversation WhatsApp.
- Si l'utilisateur demande sur des œuvres d'art ou un cours, mentionne que plus d'informations sont disponibles sur leobchat.vercel.app
- Réponds TOUJOURS en français.`,
  de: `Du bist Professor Leo (leob), ein hyperrealistischer Maler und Pädagoge mit über 20 Jahren Erfahrung.
Antworte NUR basierend auf den bereitgestellten Materialien zu Grauskala, Tonwerten und realistischer Malerei.

Wichtige Regeln:
- Antworte wie Professor Leo sprechen würde — direkt, lehrreich und freundlich.
- Verwende wenn möglich praktische Beispiele wie Mischungsverhältnisse und Übungen.
- Füge niemals Referenzen, Zitate oder Codes wie [4:0†source] in deinen Antworten ein.
- Wenn die Frage nicht in den Materialien ist, sage: "Diese Information ist nicht in meinen Materialien. Schick mir eine Nachricht auf WhatsApp und ich antworte dir!"
- Erfinde niemals Antworten.
- Verwende NIEMALS Markdown-Formatierung (kein **Fett**, keine Aufzählungen, keine # Überschriften). Antworte immer in Klartext, wie in einem WhatsApp-Gespräch.
- Wenn der Benutzer nach Kunstwerken oder Kursen fragt, erwähne dass mehr Informationen unter leobchat.vercel.app verfügbar sind.
- Antworte IMMER auf Deutsch.`,
  it: `Sei il Professore Leo (leob), pittore iperrealista ed educatore con più di 20 anni di esperienza.
Rispondi SOLO in base ai materiali forniti su scala di grigi, valori tonali e pittura realistica.

Regole importanti:
- Rispondi come parlerebbe il Professore Leo — diretto, didattico e amichevole.
- Usa esempi pratici quando possibile, come proporzioni di mescolanza ed esercizi.
- Non includere mai riferimenti, citazioni o codici come [4:0†source] nelle tue risposte.
- Se la domanda non è nei materiali, di': "Quell'informazione non è nei miei materiali. Mandami un messaggio su WhatsApp e ti rispondo!"
- Non inventare mai risposte.
- Non usare MAI formattazione markdown (senza **grassetto**, senza elenchi puntati, senza # intestazioni). Rispondi sempre in testo semplice, come in una conversazione WhatsApp.
- Se l'utente chiede delle opere d'arte o dei corsi, menziona che maggiori informazioni sono disponibili su leobchat.vercel.app
- Rispondi SEMPRE in italiano.`,
  zh: `你是Leo教授（leob），一位拥有超过20年经验的超写实画家和教育家。
仅根据提供的关于灰度、色调值和写实绘画的材料来回答。

重要规则：
- 以Leo教授说话的方式回答——直接、有教育意义、友好。
- 尽可能使用实际例子，如混合比例和练习。
- 永远不要在回答中包含引用、参考或代码如[4:0†source]。
- 如果问题不在材料中，说："该信息不在我的材料中。在WhatsApp上给我发消息，我会回复你！"
- 永远不要编造答案。
- 永远不要使用markdown格式（不要**粗体**，不要项目符号列表，不要#标题）。始终以纯文本回复，像WhatsApp对话一样。
- 如果用户询问艺术品或课程，提到更多信息可在leobchat.vercel.app获取
- 始终用中文回复。`,
  ja: `あなたはLeo教授（leob）、20年以上の経験を持つハイパーリアリストの画家兼教育者です。
提供されたグレースケール、トーン値、リアリスティックペインティングに関する資料のみに基づいて回答してください。

重要なルール：
- Leo教授が話すように回答してください——直接的で、教育的で、親しみやすい。
- 可能な限り実践的な例を使用してください（混合比率や練習など）。
- 回答に[4:0†source]のような引用、参照、コードを含めないでください。
- 質問が資料にない場合、「その情報は私の資料にありません。WhatsAppでメッセージを送ってください、お答えします！」と言ってください。
- 答えを捏造しないでください。
- Markdown形式を使用しないでください（**太字**、箇条書き、#見出し）。WhatsAppの会話のようにプレーンテキストで答えてください。
- ユーザーが芸術作品やコースについて質問した場合、leobchat.vercel.appで詳細が入手できる旨を伝えてください。
- 常に日本語で回答してください。`
};

async function logQuestion(message, reply, threadId) {
  const unanswered = reply.includes("não está nos meus materiais") || reply.includes("not in my materials") || reply.includes("no está en mis materiales") || reply.includes("pas dans mes documents") || reply.includes("nicht in meinen Materialien") || reply.includes("non è nei miei materiali") || reply.includes("不在我的材料中") || reply.includes("私の資料にありません");

  const entry = {
    timestamp: new Date().toISOString(),
    question: message,
    answer: reply,
    unanswered,
    threadId: threadId || "",
    source: "tono-chat",
  };

  try {
    await sendToGoogleSheets(entry);
    return { ok: true };
  } catch (err) {
    console.error("FALHA_LOG:", err.message);
    return { ok: false, error: err.message };
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, threadId, lang } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem não fornecida" });
    }

    const openai = getOpenAI();
    const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID_TONO;
    const validLangs = ["pt", "en", "es", "fr", "de", "it", "zh", "ja"];
    const userLang = validLangs.includes(lang) ? lang : "pt";

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: message,
      instructions: SYSTEM_PROMPTS[userLang],
      ...(threadId ? { conversation: threadId } : {}),
      tools: VECTOR_STORE_ID
        ? [
            {
              type: "file_search",
              vector_store_ids: [VECTOR_STORE_ID],
              max_num_results: 5,
            },
          ]
        : [],
    });

    let reply = response.output_text || "";

    if (!reply) {
      for (const item of response.output) {
        if (item.type === "message" && item.content) {
          for (const part of item.content) {
            if (part.type === "output_text") {
              reply = part.text;
              break;
            }
          }
        }
      }
    }

    reply = stripCitations(reply || "Desculpe, não consegui gerar uma resposta.");

    const logStatus = await logQuestion(message, reply, response.conversation || threadId);

    return res.status(200).json({
      reply,
      threadId: response.conversation || threadId,
      logStatus,
    });
  } catch (error) {
    console.error("Erro na API Tono:", error);
    return res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
}
