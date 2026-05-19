const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4-flash:free";
const AI_REQUEST_TIMEOUT_MS = Number(process.env.AI_REQUEST_TIMEOUT_MS) || 55000;

app.use(cors());
app.use(express.json());

function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    timeout: AI_REQUEST_TIMEOUT_MS,
    maxRetries: 1,
    defaultHeaders: {
      "HTTP-Referer": "https://kikro1.github.io/TaroApp/",
      "X-Title": "TaroApp",
    },
  });
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function buildPrompt({ name, birth, question, positions, cards }) {
  const cardsBlock = positions
    .map((position, index) => {
      const card = cards[index];

      return `
Позиция: ${position}
Карта: ${card.name}
Значение карты: ${card.meaning}
`;
    })
    .join("");

  return `
Ты — профессиональный таролог и пишешь готовое толкование для красивого онлайн-расклада.
Твоя задача — дать не сухую справку по картам, а глубокий, атмосферный и полезный разбор ситуации.

Имя: ${name}
Дата рождения: ${birth}
Вопрос: ${question}

Карты расклада:
${cardsBlock}

Структура ответа:

Краткий ответ
Дай ясный ответ на вопрос в 2–4 предложениях. Не уходи от ответа.

Толкование карт
Для каждой позиции отдельно напиши 2–4 содержательных абзаца:
- что символизирует карта именно в этой позиции;
- как её значение связано с вопросом пользователя;
- что карта показывает на уровне чувств, событий, скрытого влияния или внутреннего состояния;
- если карта перевёрнутая, объясни блок, страх, задержку или урок, а не просто "плохое значение".

Общий итог
Собери карты в единую историю расклада: что сейчас главное, куда движется ситуация, на что обратить внимание.

Совет
Дай один мягкий, но конкретный совет: что человеку лучше сделать или осознать сейчас.

Тон:
- пиши живым, красивым, мистическим, но понятным языком;
- используй образы таро: энергия карты, тень, ресурс, дверь, урок, внутренний голос, движение ситуации;
- не пиши слишком общие фразы вроде "всё зависит от вас" без пояснения;
- не делай медицинских, юридических или финансовых обещаний;
- не пугай пользователя и не выдавай фатальных приговоров;
- не используй markdown-разметку: без **жирного**, # заголовков, горизонтальных линий и списков с дефисами;
- оставляй заголовки обычным текстом и разделяй блоки пустыми строками.

Не предлагай дополнительных услуг и не пиши фразы вроде:
«если хотите, могу…», «если нужно, я могу…» и т.п.
Просто закончи советом.
`;
}

function buildFallbackInterpretation({ name, birth, question, positions, cards }) {
  const cardsText = positions
    .map((position, index) => {
      const card = cards[index];
      const isReversed = card.name.toLowerCase().includes("перев") || card.name.toLowerCase().includes("reversed");
      const orientationText = isReversed
        ? "Здесь карта звучит как тень или внутренний блок: энергия есть, но она может проявляться через задержку, сомнение, усталость или попытку всё контролировать."
        : "Здесь карта звучит как активная энергия расклада: она показывает ресурс, направление и то, на что стоит опереться.";

      return `${position}
${card.name}

${card.meaning}

${orientationText} В этой позиции карта помогает увидеть, какая тема сейчас требует внимания и как она влияет на вопрос. Смотри не только на событие снаружи, но и на своё состояние: именно оно подсказывает, где ситуация раскрывается, а где пока сопротивляется.`;
    })
    .join("\n\n");

  const firstCard = cards[0];
  const questionText = isNonEmptyString(question) ? question : "вашему вопросу";

  return `
Краткий ответ
По вопросу «${questionText}» главный акцент сейчас связан с картой ${firstCard.name}. Она задаёт тон всему раскладу: ${firstCard.meaning}

Это не просто отдельный знак, а центральная энергия ситуации. Она показывает, где сейчас находится главный узел: в чувствах, ожиданиях, выборе, усталости или необходимости увидеть правду спокойнее.

Толкование карт
${cardsText}

Общий итог
${name !== "Не указано" ? `${name}, ` : ""}карты складываются в историю о том, где энергия уже движется, а где она застревает. ${birth !== "Не указано" ? "Дата рождения остаётся личным фоном, но главный смысл сейчас дают сами карты. " : ""}В раскладе важно не искать мгновенный приговор, а увидеть, какой урок ситуация просит пройти и какой ресурс уже есть внутри.

Если смотреть на расклад целиком, он советует не торопить развязку силой. Лучше заметить главный мотив карт, признать свои настоящие чувства и сделать шаг, который возвращает тебе ясность.

Совет
Сейчас лучше не распыляться. Выбери одно действие, которое делает ситуацию честнее и спокойнее: задать прямой вопрос, признать своё желание, отпустить лишний контроль или дать себе время. Именно этот небольшой шаг откроет больше, чем попытка сразу решить всё.
`.trim();
}

app.get("/", (req, res) => {
  res.send("Tarot backend is running");
});

app.get("/ping", (req, res) => {
  res.send("Backend is alive!");
});

app.get("/version", (req, res) => {
  res.json({
    service: "TaroApp backend",
    commit: process.env.RENDER_GIT_COMMIT || "local",
    aiTimeoutMs: AI_REQUEST_TIMEOUT_MS,
    model: MODEL,
  });
});

app.post("/tarot", async (req, res) => {
  try {
    const { name, birth, question, positions, cards } = req.body || {};

    if (
      !Array.isArray(positions) ||
      !Array.isArray(cards) ||
      positions.length === 0 ||
      positions.length !== cards.length
    ) {
      return res.status(400).json({
        error: "Invalid request payload",
        details: "positions and cards must be non-empty arrays of the same length",
      });
    }

    const normalizedCards = cards.map((card, index) => ({
      name: isNonEmptyString(card?.localizedName)
        ? card.localizedName.trim()
        : isNonEmptyString(card?.name)
          ? card.name.trim()
          : `Card ${index + 1}`,
      meaning: isNonEmptyString(card?.meaning)
        ? card.meaning.trim()
        : "Значение не указано.",
    }));

    const prompt = buildPrompt({
      name: isNonEmptyString(name) ? name.trim() : "Не указано",
      birth: isNonEmptyString(birth) ? birth.trim() : "Не указано",
      question: isNonEmptyString(question) ? question.trim() : "Общий вопрос",
      positions,
      cards: normalizedCards,
    });

    try {
      const response = await getClient().chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const text = response.choices?.[0]?.message?.content?.trim();

      return res.json({
        text: text || buildFallbackInterpretation({
          name: isNonEmptyString(name) ? name.trim() : "Не указано",
          birth: isNonEmptyString(birth) ? birth.trim() : "Не указано",
          question: isNonEmptyString(question) ? question.trim() : "Общий вопрос",
          positions,
          cards: normalizedCards,
        }),
      });
    } catch (error) {
      console.error("AI PROVIDER ERROR:", error);

      return res.json({
        text: buildFallbackInterpretation({
          name: isNonEmptyString(name) ? name.trim() : "Не указано",
          birth: isNonEmptyString(birth) ? birth.trim() : "Не указано",
          question: isNonEmptyString(question) ? question.trim() : "Общий вопрос",
          positions,
          cards: normalizedCards,
        }),
        fallback: true,
      });
    }
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      error: "AI backend error",
      details: error.message || String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
