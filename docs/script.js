const DEFAULT_LANG = "ru";
const LOCAL_API_URL = "http://localhost:3000";
const REMOTE_API_URL = "https://taroapp.onrender.com";

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
    resultTitle: "Ваш расклад",
    name: "Имя",
    birth: "Дата рождения",
    question: "Вопрос",
    loading: "Получаю толкование...",
    finalAnswer: "Толкование",
    reversedSuffix: " (перевёрнутая)",
    defaultName: "Не указано",
    defaultBirth: "Не указано",
    defaultQuestion: "Общий вопрос",
    errors: {
      invalidSpread: "Не удалось собрать расклад.",
      server: "Ошибка при обращении к серверу.",
      unavailable: "Сервер недоступен.",
      empty: "Не удалось получить ответ от модели.",
    },
    spreadLabels: {
      one: ["Ключевая карта"],
      three: ["Прошлое", "Настоящее", "Будущее"],
      love: [
        "Ваши чувства",
        "Чувства партнёра",
        "Что между вами сейчас",
        "Что мешает",
        "Что поможет",
        "Итог",
      ],
      path: [
        "Где вы сейчас",
        "Что вас ведёт",
        "Главное препятствие",
        "Ресурс",
        "Совет",
      ],
      celtic: [
        "Суть ситуации",
        "Что мешает",
        "Основание",
        "Прошлое",
        "Возможное развитие",
        "Ближайшее будущее",
        "Ваше состояние",
        "Внешние факторы",
        "Надежды и страхи",
        "Итог",
      ],
      yesno: ["Ответ"],
    },
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
    resultTitle: "Your spread",
    name: "Name",
    birth: "Date of birth",
    question: "Question",
    loading: "Generating interpretation...",
    finalAnswer: "Interpretation",
    reversedSuffix: " (reversed)",
    defaultName: "Not specified",
    defaultBirth: "Not specified",
    defaultQuestion: "General question",
    errors: {
      invalidSpread: "Failed to build the spread.",
      server: "Server request failed.",
      unavailable: "Server is unavailable.",
      empty: "The model returned an empty answer.",
    },
    spreadLabels: {
      one: ["Key card"],
      three: ["Past", "Present", "Future"],
      love: [
        "Your feelings",
        "Partner's feelings",
        "Current dynamic",
        "What blocks you",
        "What helps",
        "Outcome",
      ],
      path: [
        "Where you are now",
        "What guides you",
        "Main obstacle",
        "Resource",
        "Advice",
      ],
      celtic: [
        "Situation",
        "Challenge",
        "Foundation",
        "Past",
        "Potential",
        "Near future",
        "Your state",
        "External factors",
        "Hopes and fears",
        "Outcome",
      ],
      yesno: ["Answer"],
    },
  },
};

function getApiBaseUrl() {
  if (typeof window !== "undefined" && typeof window.TARO_API_URL === "string") {
    return window.TARO_API_URL.replace(/\/$/, "");
  }

  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return LOCAL_API_URL;
  }

  return REMOTE_API_URL;
}

function getCurrentLang() {
  const selected = document.getElementById("langSelect")?.value;
  return localStorage.getItem("siteLang") || selected || DEFAULT_LANG;
}

function getDictionary(lang = getCurrentLang()) {
  return translations[lang] || translations[DEFAULT_LANG];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function isReversedCard() {
  return Math.random() < 0.5;
}

function setLoading(isLoading) {
  document.querySelectorAll(".buttons button").forEach((button) => {
    button.disabled = isLoading;
  });
}

function renderError(message) {
  document.getElementById("result").innerHTML = `
    <div class="card">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

async function askAI(payload, dict) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/tarot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();
    let data = {};

    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { error: rawText };
      }
    }

    if (!response.ok || data.error) {
      return data.details || data.error || dict.errors.server;
    }

    return typeof data.text === "string" && data.text.trim()
      ? data.text
      : dict.errors.empty;
  } catch {
    return dict.errors.unavailable;
  }
}

function cleanAIText(text, dict) {
  if (typeof text !== "string" || !text.trim()) {
    return dict.errors.empty;
  }

  return text
    .replace(/Если хотите[^.?!]*[.?!]/gi, "")
    .replace(/If you want[^.?!]*[.?!]/gi, "")
    .trim();
}

async function drawSpread(type) {
  const dict = getDictionary();
  const positions = dict.spreadLabels[type];

  if (!Array.isArray(positions) || positions.length === 0) {
    renderError(dict.errors.invalidSpread);
    return;
  }

  const userName =
    document.getElementById("userName").value.trim() || dict.defaultName;
  const birthDate =
    document.getElementById("birthDate").value || dict.defaultBirth;
  const userQuestion =
    document.getElementById("userQuestion").value.trim() || dict.defaultQuestion;

  const selectedCards = shuffle([...tarotCards]).slice(0, positions.length);
  const preparedCards = selectedCards.map((card) => {
    const reversed = isReversedCard();
    return {
      name: reversed ? `${card.name}${dict.reversedSuffix}` : card.name,
      meaning: reversed ? card.reversed : card.upright,
    };
  });

  let html = `
    <h2>${escapeHtml(dict.resultTitle)}</h2>
    <p><strong>${escapeHtml(dict.name)}:</strong> ${escapeHtml(userName)}</p>
    <p><strong>${escapeHtml(dict.birth)}:</strong> ${escapeHtml(birthDate)}</p>
    <p><strong>${escapeHtml(dict.question)}:</strong> ${escapeHtml(userQuestion)}</p>
  `;

  preparedCards.forEach((card, index) => {
    html += `
      <div class="card">
        <div class="card-pos">${escapeHtml(positions[index])}</div>
        <div class="card-name">${escapeHtml(card.name)}</div>
        <div>${escapeHtml(card.meaning)}</div>
      </div>
    `;
  });

  html += `
    <div class="card loading-card" id="ai-loading">
      <div class="spinner"></div>
      <div>${escapeHtml(dict.loading)}</div>
    </div>
  `;

  document.getElementById("result").innerHTML = html;
  setLoading(true);

  let aiText = await askAI(
    {
      name: userName,
      birth: birthDate,
      question: userQuestion,
      positions,
      cards: preparedCards,
    },
    dict
  );

  aiText = cleanAIText(aiText, dict);
  setLoading(false);
  document.getElementById("ai-loading")?.remove();

  document.getElementById("result").insertAdjacentHTML(
    "beforeend",
    `
      <div class="card">
        <h3>${escapeHtml(dict.finalAnswer)}</h3>
        <p>${escapeHtml(aiText).replace(/\n/g, "<br>")}</p>
      </div>
    `
  );
}

function applyTranslations() {
  const dict = getDictionary();

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dict[key]) {
      element.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      element.placeholder = dict[key];
    }
  });

  document.title = dict.title;
}

function changeLanguage() {
  const lang = document.getElementById("langSelect").value;
  localStorage.setItem("siteLang", lang);
  applyTranslations();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang") || DEFAULT_LANG;
  const savedTheme = localStorage.getItem("theme");
  const langSelect = document.getElementById("langSelect");

  if (langSelect) {
    langSelect.value = savedLang;
  }

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  applyTranslations();
});

window.drawSpread = drawSpread;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
