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
Ты — профессиональный таролог.

Имя: ${name}
Дата рождения: ${birth}
Вопрос: ${question}

Карты расклада:
${cardsBlock}

Сделай, пожалуйста:
1. Краткий ответ по вопросу (1–3 предложения).
2. Подробное толкование каждой позиции и карты.
3. Общий итог по раскладу и мягкий совет.

Пиши живым, красивым и спокойным языком. Структурируй ответ короткими смысловыми абзацами,
чтобы его было удобно читать в интерфейсе. Избегай слишком длинных предложений.

Не предлагай дополнительных услуг и не пиши фразы вроде:
«если хотите, могу…», «если нужно, я могу…» и т.п.
Просто закончи советом.
`;
}

function buildFallbackInterpretation({ name, birth, question, positions, cards }) {
  const cardsText = positions
    .map((position, index) => {
      const card = cards[index];
      return `${position}: ${card.name}. ${card.meaning}`;
    })
    .join("\n\n");

  const firstCard = cards[0];
  const questionText = isNonEmptyString(question) ? question : "вашему вопросу";

  return `
Краткий ответ
По вопросу «${questionText}» главный акцент сейчас связан с картой ${firstCard.name}. Она указывает на тему: ${firstCard.meaning}

Толкование карт
${cardsText}

Общий итог
${name !== "Не указано" ? `${name}, ` : ""}расклад показывает не одно жёсткое предсказание, а направление, на которое стоит обратить внимание. ${birth !== "Не указано" ? "Дата рождения учтена как личный контекст, но основной смысл дают выпавшие карты. " : ""}Сейчас важно спокойно отделить факты от тревоги и выбрать самый практичный следующий шаг.

Совет
Опирайтесь на то, что уже ясно по ситуации, и не пытайтесь контролировать всё сразу. Один честный и небольшой шаг даст больше, чем ожидание идеального момента.
`.trim();
}

app.get("/", (req, res) => {
  res.send("Tarot backend is running");
});

app.get("/ping", (req, res) => {
  res.send("Backend is alive!");
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
      name: isNonEmptyString(card?.name) ? card.name.trim() : `Card ${index + 1}`,
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
