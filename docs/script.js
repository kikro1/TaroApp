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
      return "Ошибка при обращении к серверу.";
    }

    return data.text;
  } catch (err) {
    return "Сервер недоступен.";
  }
}



// ----------------------
// ОСНОВНАЯ ФУНКЦИЯ РАСКЛАДА
// ----------------------

function cleanAIText(text) {
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

  const labelsMap = translations[currentLang].spreadLabels;

  const positions = labelsMap[type];

  const preparedCards = selected.map((card) => {
    const rev = reversed();
    return {
      name: rev ? card.name + translations[currentLang].reversed : card.name,
      meaning: rev ? card.reversed : card.upright,
    };
  });


  let html = `
    <h2>${translations[currentLang].resultTitle}</h2>

    <p><strong>${translations[currentLang].name}:</strong> ${userName}</p>
    <p><strong>${translations[currentLang].birth}:</strong> ${birthDate}</p>
    <p><strong>${translations[currentLang].question}:</strong> ${userQuestion}</p>
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

  html += `
    <div class="card loading-card" id="ai-loading">
      <div class="spinner"></div>
      <div>${translations[currentLang].loading}</div>
    </div>
  `;

  document.getElementById("result").innerHTML = html;

  setLoading(true);

  let aiText = await askAI(
    positions,
    preparedCards,
    userName,
    birthDate,
    userQuestion
  );

  aiText = cleanAIText(aiText);

  setLoading(false);

  const load = document.getElementById("ai-loading");
  if (load) load.remove();

  document.getElementById("result").innerHTML += `
    <div class="card">
      <h3>${translations[currentLang].finalAnswer}</h3>
      <p>${aiText.replace(/\n/g, "<br>")}</p>
    </div>
  `;
}


const translations = {
  ru: {
    title: "Tarot — Онлайн расклады",
    langLabel: "Язык:",
    themeLabel: "Тема:",
    mainTitle: "🔮 Tarot — Онлайн расклад",
    description: "Введите данные и выберите расклад, чтобы получить толкование карт и ответ.",
    nameLabel: "Ваше имя:",
    namePh: "Введите имя",
    birthLabel: "Дата рождения:",
    questionLabel: "Ваш вопрос:",
    questionPh: "Например: Что ждёт меня в отношениях?",
    chooseSpread: "Выберите расклад",
    btnOne: "1 карта",
    btnThree: "3 карты",
    btnLove: "Любовный расклад",
    btnPath: "Путь и совет",
    btnCeltic: "Кельтский крест",
    btnYesNo: "Да / Нет",
  },

  en: {
    title: "Tarot — Online Readings",
    langLabel: "Language:",
    themeLabel: "Theme:",
    mainTitle: "🔮 Tarot — Online Reading",
    description: "Enter your data and choose a spread to receive an interpretation and answer.",
    nameLabel: "Your name:",
    namePh: "Enter your name",
    birthLabel: "Date of birth:",
    questionLabel: "Your question:",
    questionPh: "Example: What awaits me in relationships?",
    chooseSpread: "Choose a spread",
    btnOne: "1 card",
    btnThree: "3 cards",
    btnLove: "Love spread",
    btnPath: "Path & advice",
    btnCeltic: "Celtic cross",
    btnYesNo: "Yes / No",
  }
};


// ------------------------
// Применение перевода
// ------------------------
function applyTranslations() {
  const lang = localStorage.getItem("siteLang") || "ru";
  const dict = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });

  document.title = dict["title"];
}

document.addEventListener("DOMContentLoaded", applyTranslations);


function changeLanguage() {
  const lang = document.getElementById("langSelect").value;
  localStorage.setItem("siteLang", lang);
  applyTranslations(); // мгновенный перевод
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang") || "ru";
  const savedTheme = localStorage.getItem("theme");

  const langSelect = document.getElementById("langSelect");
  langSelect.value = savedLang;

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  applyTranslations();
});