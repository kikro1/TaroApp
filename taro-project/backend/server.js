const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai"); // <-- ВАЖНО: исправлено

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Тестовый маршрут — можно открыть: https://taroapp.onrender.com/ping
app.get("/ping", (req, res) => {
  res.send("Backend is alive!");
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

Не предлагай дополнительных услуг и не пиши фразы вроде:
«если хотите, могу…», «если нужно, я могу…» и т.п.
Просто закончи советом.
`;

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    const text = response.output_text || "Не удалось получить ответ от модели.";

    res.json({ text });
  } catch (err) {
  console.error("AI ERROR:", err.response?.data || err.message || err);
  res.status(500).json({
    error: "AI backend error",
    details: err.response?.data || err.message || err.toString(),
  });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});