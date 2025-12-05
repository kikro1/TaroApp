const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai/index.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/tarot", async (req, res) => {
  try {
    const { name, birth, question, positions, cards } = req.body;

    const prompt = `
Ты — профессиональный таролог.

Имя: ${name}
Дата рождения: ${birth}
Вопрос: ${question}

Карты расклада:
${positions
  .map(
    (pos, i) => `
Позиция: ${pos}
Карта: ${cards[i].name}
Значение карты: ${cards[i].meaning}
`
  )
  .join("")}

Сделай, пожалуйста:
1. Краткий ответ по вопросу (1–3 предложения).
2. Подробное толкование каждой позиции и карты.
3. Общий итог по раскладу и мягкий совет.

Не предлагай дополнительных услуг и не пиши фраз вроде
«если хотите, могу…», «если нужно, я могу…» и т.п.
Просто закончи текст итоговым советом.
    `;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    const text = response.output_text || "Не удалось получить ответ от модели.";

    res.json({ text });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI backend error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Tarot AI backend running on http://localhost:" + PORT);
});