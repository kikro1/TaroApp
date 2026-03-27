const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

app.use(cors());
app.use(express.json());

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  return new OpenAI({ apiKey });
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

Не предлагай дополнительных услуг и не пиши фразы вроде:
«если хотите, могу…», «если нужно, я могу…» и т.п.
Просто закончи советом.
`;
}

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

    const response = await getClient().responses.create({
      model: MODEL,
      input: prompt,
    });

    const text =
      typeof response.output_text === "string" && response.output_text.trim()
        ? response.output_text
        : "Не удалось получить ответ от модели.";

    return res.json({ text });
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
