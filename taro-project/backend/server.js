const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_MODEL = "deepseek/deepseek-v4-flash:free";
const configuredModel = process.env.OPENROUTER_MODEL;
const MODEL = !configuredModel || configuredModel === "openrouter/free"
  ? DEFAULT_MODEL
  : configuredModel;
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
Ты — профессиональный таролог. Дай готовое толкование: по делу, живо, образно, без лишней воды.

Имя: ${name}
Дата рождения: ${birth}
Вопрос: ${question}

Карты расклада:
${cardsBlock}

Формат:

Краткий ответ
2–3 предложения: ясный ответ по вопросу и общий тон расклада.

Толкование карт
Для каждой позиции: название позиции, карта, 3–5 предложений. Объясни смысл карты именно в этой позиции, связь с вопросом, ресурс или блок. Для перевёрнутой карты объясни задержку, страх или урок.

Общий итог
3–5 предложений: собери карты в единую историю, покажи главное напряжение и направление ситуации.

Совет
1–3 предложения: мягкий, конкретный следующий шаг.

Правила: только русский язык; без markdown, списков и латиницы; без медицинских, юридических и финансовых обещаний; без фраз «если хотите, могу…». Стиль — спокойный, тарологический, но понятный. Не растягивай ответ.
`;
}

function buildFallbackInterpretation({ name, birth, question, positions, cards }) {
  const cardsText = positions
    .map((position, index) => {
      const card = cards[index];
      const isReversed = card.name.toLowerCase().includes("перев") || card.name.toLowerCase().includes("reversed");
      const orientationText = isReversed
        ? "Карта показывает задержку, усталость или внутренний блок, который мешает энергии течь свободно."
        : "Карта показывает активный ресурс и направление, на которое можно опереться.";

      return `${position}
${card.name}

${card.meaning}

${orientationText} В этой позиции важно увидеть не только внешнее событие, но и своё состояние: именно оно подсказывает, где ситуация раскрывается, а где пока сопротивляется.`;
    })
    .join("\n\n");

  const firstCard = cards[0];
  const questionText = isNonEmptyString(question) ? question : "вашему вопросу";

  return `
Краткий ответ
По вопросу «${questionText}» главный акцент сейчас связан с картой ${firstCard.name}. Она задаёт тон всему раскладу: ${firstCard.meaning}

Толкование карт
${cardsText}

Общий итог
${name !== "Не указано" ? `${name}, ` : ""}карты показывают, где энергия уже движется, а где она застревает. ${birth !== "Не указано" ? "Дата рождения остаётся личным фоном, но главный смысл дают выпавшие карты. " : ""}Сейчас важнее не искать жёсткий приговор, а увидеть главный урок ситуации и ближайший честный шаг.

Совет
Не пытайся решить всё сразу. Выбери одно действие, которое делает ситуацию честнее и спокойнее: задать прямой вопрос, признать своё желание, отпустить лишний контроль или дать себе время.
`.trim();
}

function getResponseTokenLimit(cardCount) {
  return Math.min(2400, 350 + cardCount * 220);
}

function cleanModelText(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-—]{3,}\s*$/gm, "")
    .trim();
}

function isSuspiciousModelText(text) {
  if (!isNonEmptyString(text)) {
    return true;
  }

  const latinFragments = text.match(/[A-Za-zÀ-ÖØ-öø-ÿ]{3,}/g) || [];
  const cyrillicLetters = text.match(/[А-Яа-яЁё]/g) || [];

  return latinFragments.length > 0 || cyrillicLetters.length < 120;
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
        temperature: 0.55,
        max_tokens: getResponseTokenLimit(positions.length),
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const text = cleanModelText(response.choices?.[0]?.message?.content || "");
      const fallbackText = buildFallbackInterpretation({
        name: isNonEmptyString(name) ? name.trim() : "Не указано",
        birth: isNonEmptyString(birth) ? birth.trim() : "Не указано",
        question: isNonEmptyString(question) ? question.trim() : "Общий вопрос",
        positions,
        cards: normalizedCards,
      });

      const shouldUseFallback = isSuspiciousModelText(text);

      return res.json({
        text: shouldUseFallback ? fallbackText : text,
        fallback: shouldUseFallback,
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
