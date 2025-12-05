// ----------------------
// Загрузка карт из cards.js
// ----------------------
// cards.js должен содержать массив tarotCards = [{ name, upright, reversed }, ...]



// ----------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ----------------------

// Перемешивание массива
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

// Случайная перевёрнутость карты
function reversed() {
  return Math.random() < 0.5;
}

// Управление состоянием загрузки (блокировка кнопок)
function setLoading(isLoading) {
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((btn) => {
    btn.disabled = isLoading;
  });
}



// ----------------------
// ОТПРАВКА ЗАПРОСА К AI BACKEND
// ----------------------

async function askAI(positions, cards, name, birth, question) {
  try {
    const response = await fetch("https://taroapp.onrender.com/tarot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        birth,
        question,
        positions,
        cards,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return "Ошибка при обращении к ИИ.";
    }

    return data.text;
  } catch (err) {
    return "Сервер ИИ недоступен.";
  }
}



// ----------------------
// ОСНОВНАЯ ФУНКЦИЯ РАСКЛАДА
// ----------------------
function cleanAIText(text) {
  // убираем предложения, начинающиеся с "Если хотите"
  return text.replace(/Если хотите[^.?!]*[.?!]/gi, "").trim();
}
async function drawSpread(type) {
  const userName = document.getElementById("userName").value || "Не указано";
  const birthDate = document.getElementById("birthDate").value || "Не указано";
  const userQuestion =
    document.getElementById("userQuestion").value || "Общий вопрос";

  let count = 1;
  switch (type) {
    case "one": count = 1; break;
    case "three": count = 3; break;
    case "love": count = 6; break;
    case "path": count = 5; break;
    case "celtic": count = 10; break;
    case "yesno": count = 1; break;
  }

  const shuffled = shuffle([...tarotCards]);
  const selected = shuffled.slice(0, count);

  const labelsMap = {
    one: ["Ответ / совет"],
    three: ["Прошлое", "Настоящее", "Будущее"],
    love: ["Вы", "Партнёр", "Связь", "Проблемы", "Сильные стороны", "Будущее"],
    path: ["Где вы", "Препятствия", "Ресурсы", "Совет", "Итог"],
    celtic: [
      "Суть", "Препятствие", "Основа",
      "Прошлое", "Сознательное", "Будущее",
      "Вы", "Окружение", "Страхи", "Итог",
    ],
    yesno: ["Карта"],
  };

  const positions = labelsMap[type];

  // Подготовка карт (учёт перевёрнутости)
  const preparedCards = selected.map((card) => {
    const rev = reversed();
    return {
      name: rev ? card.name + " (перевёрнутая)" : card.name,
      meaning: rev ? card.reversed : card.upright,
    };
  });



  // РЕНДЕРИМ КАРТЫ

  let html = `
    <h2>Результат расклада</h2>

    <p><strong>Имя:</strong> ${userName}</p>
    <p><strong>Дата рождения:</strong> ${birthDate}</p>
    <p><strong>Вопрос:</strong> ${userQuestion}</p>
  `;

  preparedCards.forEach((c, i) => {
    html += `
      <div class="card">
        <div class="card-pos">${positions[i]}</div>
        <div class="card-name">${c.name}</div>
        <div>${c.meaning}</div>
      </div>
    `;
  });


  // ДОБАВЛЯЕМ КАРТУ ЗАГРУЗКИ

  html += `
    <div class="card loading-card" id="ai-loading">
      <div class="spinner"></div>
      <div>Толкование ИИ: генерирую ответ...</div>
    </div>
  `;

  document.getElementById("result").innerHTML = html;


  // Включаем состояние загрузки
  setLoading(true);


  // Запрашиваем ответ ИИ
  let aiText = await askAI(
  positions,
  preparedCards,
  userName,
  birthDate,
  userQuestion
);

aiText = cleanAIText(aiText);


  // Выключаем состояние загрузки
  setLoading(false);


  // Удаляем блок загрузки
  const load = document.getElementById("ai-loading");
  if (load) load.remove();


  // Добавляем итог ИИ
  document.getElementById("result").innerHTML += `
    <div class="card">
      <h3>Ответ ИИ</h3>
      <p>${aiText.replace(/\n/g, "<br>")}</p>
    </div>
  `;
}