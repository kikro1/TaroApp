const DEFAULT_LANG = "ru";
const LOCAL_API_URL = "http://localhost:3000";
const REMOTE_API_URL = "https://taroapp.onrender.com";
const REQUEST_TIMEOUT_MS = 30000;
const MAJOR_ARCANA_RU = {
  "0 The Fool": "0 Шут",
  "I The Magician": "I Маг",
  "II The High Priestess": "II Верховная Жрица",
  "III The Empress": "III Императрица",
  "IV The Emperor": "IV Император",
  "V The Hierophant": "V Иерофант",
  "VI The Lovers": "VI Влюблённые",
  "VII The Chariot": "VII Колесница",
  "VIII Strength": "VIII Сила",
  "IX The Hermit": "IX Отшельник",
  "X Wheel of Fortune": "X Колесо Фортуны",
  "XI Justice": "XI Справедливость",
  "XII The Hanged Man": "XII Повешенный",
  "XIII Death": "XIII Смерть",
  "XIV Temperance": "XIV Умеренность",
  "XV The Devil": "XV Дьявол",
  "XVI The Tower": "XVI Башня",
  "XVII The Star": "XVII Звезда",
  "XVIII The Moon": "XVIII Луна",
  "XIX The Sun": "XIX Солнце",
  "XX Judgement": "XX Суд",
  "XXI The World": "XXI Мир",
};
const MINOR_RANKS_RU = {
  Ace: "Туз",
  Two: "Двойка",
  Three: "Тройка",
  Four: "Четвёрка",
  Five: "Пятёрка",
  Six: "Шестёрка",
  Seven: "Семёрка",
  Eight: "Восьмёрка",
  Nine: "Девятка",
  Ten: "Десятка",
  Page: "Паж",
  Knight: "Рыцарь",
  Queen: "Королева",
  King: "Король",
};
const MINOR_SUITS_RU = {
  Wands: "Жезлов",
  Cups: "Кубков",
  Swords: "Мечей",
  Pentacles: "Пентаклей",
};

const translations = {
  ru: {
    title: "Tarot — Онлайн расклады",
    langLabel: "Язык:",
    themeLabel: "Тема:",
    themeToggle: "Сменить",
    eyebrow: "Интуитивный онлайн-расклад",
    mainTitle: "Tarot — Онлайн расклад",
    description: "Введите данные и выберите расклад, чтобы получить толкование карт и ответ.",
    detailsTitle: "Данные для расклада",
    nameLabel: "Ваше имя",
    namePh: "Введите имя",
    birthLabel: "Дата рождения",
    questionLabel: "Ваш вопрос",
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
    cardImageAlt: "Иллюстрация карты",
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
    themeToggle: "Switch",
    eyebrow: "Intuitive online reading",
    mainTitle: "Tarot — Online Reading",
    description: "Enter your data and choose a spread to receive an interpretation and answer.",
    detailsTitle: "Reading details",
    nameLabel: "Your name",
    namePh: "Enter your name",
    birthLabel: "Date of birth",
    questionLabel: "Your question",
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
    cardImageAlt: "Card illustration",
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

function getAvailableCards() {
  if (Array.isArray(window.tarotCards)) {
    return window.tarotCards;
  }

  if (typeof tarotCards !== "undefined" && Array.isArray(tarotCards)) {
    return tarotCards;
  }

  return [];
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

function getLocalizedCardName(baseName, reversed, lang) {
  if (lang !== "ru") {
    return "";
  }

  if (MAJOR_ARCANA_RU[baseName]) {
    return `${MAJOR_ARCANA_RU[baseName]}${reversed ? translations.ru.reversedSuffix : ""}`;
  }

  const match = /^(.+?) of (Wands|Cups|Swords|Pentacles)$/.exec(baseName);
  if (!match) {
    return reversed ? `${baseName}${translations.ru.reversedSuffix}` : baseName;
  }

  const [, rank, suit] = match;
  const rankRu = MINOR_RANKS_RU[rank];
  const suitRu = MINOR_SUITS_RU[suit];

  if (!rankRu || !suitRu) {
    return reversed ? `${baseName}${translations.ru.reversedSuffix}` : baseName;
  }

  return `${rankRu} ${suitRu}${reversed ? translations.ru.reversedSuffix : ""}`;
}

function getCardVisualMeta(cardName) {
  const normalizedName = String(cardName).toLowerCase();

  if (normalizedName.includes("wand")) {
    return { suit: "wands", symbol: "✦" };
  }

  if (normalizedName.includes("cup")) {
    return { suit: "cups", symbol: "◌" };
  }

  if (normalizedName.includes("sword")) {
    return { suit: "swords", symbol: "◇" };
  }

  if (normalizedName.includes("pentacle")) {
    return { suit: "pentacles", symbol: "✧" };
  }

  return { suit: "major", symbol: "☉" };
}

function renderCardVisual(card, index, dict) {
  const visual = getCardVisualMeta(card.baseName);
  const image = typeof card.image === "string" && card.image.trim()
    ? card.image.trim()
    : "";
  const imageHtml = image
    ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(`${dict.cardImageAlt}: ${card.name}`)}" loading="lazy" />`
    : `
      <div class="tarot-art" data-suit="${escapeHtml(visual.suit)}" aria-hidden="true">
        <span class="tarot-art-symbol">${escapeHtml(visual.symbol)}</span>
        <span class="tarot-art-orbit"></span>
        <span class="tarot-art-title">${escapeHtml(card.baseName)}</span>
      </div>
    `;

  return `
    <figure class="card-visual ${card.reversed ? "is-reversed" : ""}">
      ${imageHtml}
      <figcaption>${escapeHtml(index + 1)}</figcaption>
    </figure>
  `;
}

function setLoading(isLoading) {
  document.querySelectorAll(".buttons button").forEach((button) => {
    button.disabled = isLoading;
    button.setAttribute("aria-busy", String(isLoading));
  });
}

function renderError(message) {
  const result = document.getElementById("result");
  result.innerHTML = `
    <div class="card">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function askAI(payload, dict) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${getApiBaseUrl()}/tarot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
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
  } catch (error) {
    if (error?.name === "AbortError") {
      return dict.errors.unavailable;
    }

    return dict.errors.unavailable;
  } finally {
    window.clearTimeout(timeoutId);
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
  const availableCards = getAvailableCards();

  if (
    !Array.isArray(positions) ||
    positions.length === 0 ||
    availableCards.length < positions.length
  ) {
    renderError(dict.errors.invalidSpread);
    return;
  }

  const userName =
    document.getElementById("userName").value.trim() || dict.defaultName;
  const birthDate =
    document.getElementById("birthDate").value || dict.defaultBirth;
  const userQuestion =
    document.getElementById("userQuestion").value.trim() || dict.defaultQuestion;

  const selectedCards = shuffle([...availableCards]).slice(0, positions.length);
  const preparedCards = selectedCards.map((card) => {
    const reversed = isReversedCard();
    return {
      baseName: card.name,
      name: reversed ? `${card.name}${dict.reversedSuffix}` : card.name,
      localizedName: getLocalizedCardName(card.name, reversed, getCurrentLang()),
      meaning: reversed ? card.reversed : card.upright,
      image: card.image,
      reversed,
    };
  });

  let html = `
    <div class="result-header">
      <h2>${escapeHtml(dict.resultTitle)}</h2>
      <div class="result-meta">
        <span><strong>${escapeHtml(dict.name)}</strong>${escapeHtml(userName)}</span>
        <span><strong>${escapeHtml(dict.birth)}</strong>${escapeHtml(birthDate)}</span>
        <span><strong>${escapeHtml(dict.question)}</strong>${escapeHtml(userQuestion)}</span>
      </div>
    </div>
  `;

  preparedCards.forEach((card, index) => {
    html += `
      <article class="card dealt-card" style="--deal-index: ${index}">
        ${renderCardVisual(card, index, dict)}
        <div class="card-copy">
          <div class="card-pos">${escapeHtml(positions[index])}</div>
          <div class="card-name">${escapeHtml(card.name)}</div>
          ${card.localizedName ? `<div class="card-name-ru">${escapeHtml(card.localizedName)}</div>` : ""}
          <p>${escapeHtml(card.meaning)}</p>
        </div>
      </article>
    `;
  });

  html += `
    <div class="reading-divider" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  html += `
    <div class="card loading-card" id="ai-loading">
      <div class="spinner"></div>
      <div>${escapeHtml(dict.loading)}</div>
    </div>
  `;

  const result = document.getElementById("result");
  result.innerHTML = html;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
  setLoading(true);

  try {
    const aiText = cleanAIText(
      await askAI(
        {
          name: userName,
          birth: birthDate,
          question: userQuestion,
          positions,
          cards: preparedCards,
        },
        dict
      ),
      dict
    );

    result.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card ai-answer-card">
          <h3>${escapeHtml(dict.finalAnswer)}</h3>
          <p>${escapeHtml(aiText).replace(/\n/g, "<br>")}</p>
        </div>
      `
    );
  } finally {
    setLoading(false);
    document.getElementById("ai-loading")?.remove();
  }
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
  document.documentElement.lang = getCurrentLang();
}

function changeLanguage() {
  const lang = document.getElementById("langSelect").value;
  localStorage.setItem("siteLang", lang);
  applyTranslations();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("themeToggle")?.setAttribute("aria-pressed", String(isDark));
  document.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang") || DEFAULT_LANG;
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const langSelect = document.getElementById("langSelect");
  const themeToggle = document.getElementById("themeToggle");

  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", changeLanguage);
  }

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  themeToggle?.addEventListener("click", toggleTheme);
  themeToggle?.setAttribute(
    "aria-pressed",
    String(document.body.classList.contains("dark-theme"))
  );
  document.querySelector(".theme-icon").textContent = document.body.classList.contains("dark-theme")
    ? "☀"
    : "☾";

  document.querySelectorAll("[data-spread]").forEach((button) => {
    button.addEventListener("click", () => drawSpread(button.dataset.spread));
  });

  applyTranslations();
});

window.drawSpread = drawSpread;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
