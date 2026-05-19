const DEFAULT_LANG = "ru";
const LOCAL_API_URL = "http://localhost:3000";
const REMOTE_API_URL = "https://taroapp.onrender.com";
const REQUEST_TIMEOUT_MS = 90000;
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
const MAJOR_VISUAL_META = {
  "0 The Fool": { key: "fool" },
  "I The Magician": { key: "magician" },
  "II The High Priestess": { key: "priestess" },
  "III The Empress": { key: "empress" },
  "IV The Emperor": { key: "emperor" },
  "V The Hierophant": { key: "hierophant" },
  "VI The Lovers": { key: "lovers" },
  "VII The Chariot": { key: "chariot" },
  "VIII Strength": { key: "strength" },
  "IX The Hermit": { key: "hermit" },
  "X Wheel of Fortune": { key: "fortune" },
  "XI Justice": { key: "justice" },
  "XII The Hanged Man": { key: "hanged" },
  "XIII Death": { key: "death" },
  "XIV Temperance": { key: "temperance" },
  "XV The Devil": { key: "devil" },
  "XVI The Tower": { key: "tower" },
  "XVII The Star": { key: "star" },
  "XVIII The Moon": { key: "moon" },
  "XIX The Sun": { key: "sun" },
  "XX Judgement": { key: "judgement" },
  "XXI The World": { key: "world" },
};

const translations = {
  ru: {
    title: "Tarot — Онлайн расклады",
    langLabel: "Язык:",
    themeLabel: "Тема:",
    themeToggle: "Сменить",
    readingLink: "Расклад",
    galleryLink: "Галерея карт",
    eyebrow: "Интуитивный онлайн-расклад",
    mainTitle: "Tarot — Онлайн расклад",
    description: "Введите данные и выберите расклад, чтобы получить толкование карт и ответ.",
    detailsTitle: "Данные для расклада",
    detailsSubtitle: "Можно оставить поля пустыми, если нужен общий расклад.",
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
    btnOneDesc: "Быстрый фокус",
    btnThreeDesc: "Прошлое, настоящее, будущее",
    btnLoveDesc: "Чувства и динамика",
    btnPathDesc: "Опора и следующий шаг",
    btnCelticDesc: "Подробный разбор",
    btnYesNoDesc: "Короткое решение",
    spreadSubtitle: "Короткий ответ, глубокий разбор или совет по ситуации.",
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
    readingLink: "Reading",
    galleryLink: "Card gallery",
    eyebrow: "Intuitive online reading",
    mainTitle: "Tarot — Online Reading",
    description: "Enter your data and choose a spread to receive an interpretation and answer.",
    detailsTitle: "Reading details",
    detailsSubtitle: "You can leave fields empty for a general reading.",
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
    btnOneDesc: "Quick focus",
    btnThreeDesc: "Past, present, future",
    btnLoveDesc: "Feelings and dynamic",
    btnPathDesc: "Support and next step",
    btnCelticDesc: "Detailed reading",
    btnYesNoDesc: "Short decision",
    spreadSubtitle: "Choose a quick answer, a deeper reading, or advice for the situation.",
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
  const majorMeta = MAJOR_VISUAL_META[cardName];

  if (majorMeta) {
    return { suit: "major", ...majorMeta };
  }

  if (normalizedName.includes("wand")) {
    return { suit: "wands", key: "wands" };
  }

  if (normalizedName.includes("cup")) {
    return { suit: "cups", key: "cups" };
  }

  if (normalizedName.includes("sword")) {
    return { suit: "swords", key: "swords" };
  }

  if (normalizedName.includes("pentacle")) {
    return { suit: "pentacles", key: "pentacles" };
  }

  return { suit: "major", key: "major" };
}

function renderCardGlyph(key) {
  const glyphs = {
    fool: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M42 52C28 20 11 25 11 48c0 16 13 22 27 12" />
        <path d="M78 52c14-32 31-27 31-4 0 16-13 22-27 12" />
        <circle cx="12" cy="53" r="7" />
        <circle cx="108" cy="53" r="7" />
        <path d="M37 61c1-22 45-22 46 0" />
        <path d="M38 61c5-14 39-14 44 0" />
        <path d="M36 64c1 34 47 34 48 0" />
        <path d="M42 64c4 8 32 8 36 0" />
        <path d="M43 78c7-5 14-5 20 0M57 78c7-5 14-5 20 0" />
        <path d="M55 88c3 3 7 3 10 0" />
        <path d="M49 97c7 5 15 5 22 0" />
        <path d="M26 116c8-15 15-15 23 0 7-15 15-15 22 0 8-15 15-15 23 0" />
        <path d="M24 123h72" />
      </svg>
    `,
    magician: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M40 34c9-18 31-18 40 0l-9 10H49l-9-10Z" />
        <circle cx="60" cy="54" r="15" />
        <path d="M43 78c9-12 25-13 34 0l8 52H35l8-52Z" />
        <path d="M26 103h68M36 111h48" />
        <path d="M83 72l20-42M96 30l7-13 5 14" />
        <path d="M47 25c9-9 17-9 26 0" />
      </svg>
    `,
    priestess: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M27 26v100M93 26v100" />
        <path d="M22 26h20M78 26h20M22 126h20M78 126h20" />
        <circle cx="60" cy="52" r="15" />
        <path d="M45 36c7-16 23-16 30 0M48 31h24" />
        <path d="M42 75c13-11 23-11 36 0l8 54H34l8-54Z" />
        <path d="M45 94h30M49 107h22" />
        <path d="M35 132c15-14 35-14 50 0" />
      </svg>
    `,
    empress: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M34 47 44 25l16 17 16-17 10 22H34Z" />
        <path d="M41 47h38" />
        <circle cx="60" cy="82" r="24" />
        <path d="M60 106v26M45 119h30" />
        <path d="M31 82c-10-10-10-25 0-35M89 82c10-10 10-25 0-35" />
      </svg>
    `,
    emperor: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M38 48 47 26l13 16 13-16 9 22H38Z" />
        <path d="M42 48h36" />
        <path d="M42 63h36v59H42z" />
        <path d="M52 78h16v44H52z" />
        <path d="M32 122h56" />
        <path d="M36 63h48" />
      </svg>
    `,
    hierophant: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M45 39 60 18l15 21-15 10-15-10Z" />
        <circle cx="60" cy="58" r="14" />
        <path d="M36 83c13-15 35-15 48 0l5 48H31l5-48Z" />
        <path d="M60 78v50M48 100h24" />
        <path d="M88 55v77M82 64h12" />
        <path d="M37 116c-9-8-8-19 0-26M83 116c9-8 8-19 0-26" />
      </svg>
    `,
    lovers: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M60 35c9-18 34-4 18 13L60 66 42 48C26 31 51 17 60 35Z" />
        <circle cx="39" cy="76" r="12" />
        <circle cx="81" cy="76" r="12" />
        <path d="M27 100c7-13 18-13 25 0l-4 30H31l-4-30Z" />
        <path d="M68 100c7-13 18-13 25 0l-4 30H72l-4-30Z" />
        <path d="M49 108c8 10 14 10 22 0" />
        <path d="M24 132h72" />
      </svg>
    `,
    chariot: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M35 48h50l-6 34H41l-6-34Z" />
        <path d="M43 48V34h34v14M36 34h48" />
        <circle cx="60" cy="34" r="11" />
        <path d="M47 22h26" />
        <path d="M31 82h58l-8 37H39l-8-37Z" />
        <circle cx="42" cy="123" r="10" />
        <circle cx="78" cy="123" r="10" />
        <path d="M20 112c12-23 28-20 33-3M100 112c-12-23-28-20-33-3" />
      </svg>
    `,
    strength: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M62 35c16-18 45-3 37 24-4 15-17 28-33 29" />
        <path d="M77 39c-8 0-16 7-17 16 10-3 18-3 27 2" />
        <circle cx="80" cy="58" r="3" />
        <path d="M49 40c-10 0-17 7-17 17s7 17 17 17" />
        <path d="M39 76c-10 11-12 32-3 49h28c8-17 7-38-3-49" />
        <path d="M52 74c3 16 18 22 35 15" />
        <path d="M35 126h50" />
      </svg>
    `,
    hermit: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M41 29 78 129" />
        <path d="M54 43c21-8 38-1 48 17-13 13-35 11-52-4" />
        <path d="M63 56c9 5 18 7 28 4" />
        <path d="M33 132h52" />
      </svg>
    `,
    temperance: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M36 34h28l-6 30c-3 12-19 12-22 0l-6-30h6Z" />
        <path d="M58 62c13 11 24 14 37 5" />
        <path d="M72 43h28l-6 30c-3 12-19 12-22 0l-6-30h6Z" />
        <path d="M30 99c17 12 43 12 60 0" />
        <path d="M24 118c20 14 52 14 72 0" />
        <path d="M43 28c12-8 25-8 37 0" />
      </svg>
    `,
    devil: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M60 24v96" />
        <path d="M43 44c10-20 24-20 34 0" />
        <path d="M39 61h42" />
        <path d="M60 120 43 99h34l-17 21Z" />
        <path d="M44 29c-15-2-25-10-30-24 16 1 27 9 34 23" />
        <path d="M76 29c15-2 25-10 30-24-16 1-27 9-34 23" />
      </svg>
    `,
    tower: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M36 42h48v91H36V42Z" />
        <path d="M30 42h60l-9-18H39l-9 18Z" />
        <path d="M39 24v-9M54 24v-9M66 24v-9M81 24v-9" />
        <path d="M50 75h20v58H50V75Z" />
        <path d="M75 42 57 78h20l-18 42 34-58H72l13-20Z" class="glyph-accent" />
      </svg>
    `,
    star: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 12 55 40 83 48 55 56 48 84 41 56 13 48 41 40z" />
        <path d="M48 29v38M29 48h38" />
      </svg>
    `,
    sun: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="48" r="19" />
        <path d="M48 8v17M48 71v17M8 48h17M71 48h17M20 20l12 12M64 64l12 12M76 20 64 32M32 64 20 76" />
      </svg>
    `,
    moon: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M59 14c-20 5-31 27-20 46 7 12 21 19 35 16-8 8-21 12-34 8-20-6-31-27-25-47 6-19 25-29 44-23Z" />
        <path d="M30 78c9-8 27-8 36 0" />
      </svg>
    `,
    fortune: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <circle cx="60" cy="75" r="45" />
        <circle cx="60" cy="75" r="15" />
        <path d="M60 30v90M15 75h90M28 43l64 64M92 43l-64 64" />
        <path d="M60 18 68 30H52l8-12ZM60 132l-8-12h16l-8 12ZM3 75l12-8v16L3 75ZM117 75l-12 8V67l12 8Z" />
      </svg>
    `,
    justice: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M60 24v98M42 122h36M50 136h20" />
        <path d="M30 50h60" />
        <path d="M30 50 17 83h26L30 50ZM90 50 77 83h26L90 50Z" />
        <path d="M17 83c6 9 20 9 26 0M77 83c6 9 20 9 26 0" />
        <path d="M52 24h16M45 32h30" />
      </svg>
    `,
    hanged: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M28 24h64M36 24v110M28 134h42" />
        <path d="M78 24v22" />
        <circle cx="78" cy="61" r="11" />
        <path d="M78 72v35M59 84l19 15 20-15" />
        <path d="M78 107 62 130M78 107l16 23" />
      </svg>
    `,
    death: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M60 21v108" />
        <path d="M35 47c18-18 32-18 50 0" />
        <path d="M28 66h64" />
        <path d="M43 86h34" />
        <path d="M60 129 38 103h44l-22 26Z" />
        <path d="M38 32c-12 2-22-4-29-16 14-2 25 3 33 14" />
        <path d="M82 32c12 2 22-4 29-16-14-2-25 3-33 14" />
      </svg>
    `,
    world: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <circle cx="60" cy="75" r="38" />
        <path d="M36 102c10-18 38-18 48 0M36 48c10 18 38 18 48 0" />
        <path d="M60 37c-16 16-16 60 0 76M60 37c16 16 16 60 0 76" />
        <path d="M31 34c-20 20-20 62 0 82M89 34c20 20 20 62 0 82" />
        <path d="M29 34c-7 8-15 11-24 8M91 34c7 8 15 11 24 8M29 116c-7-8-15-11-24-8M91 116c7-8 15-11 24-8" />
      </svg>
    `,
    judgement: `
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M60 22v88M41 110h38M48 126h24" />
        <path d="M36 58h48" />
        <path d="M36 58 25 89h22L36 58ZM84 58 73 89h22L84 58Z" />
        <path d="M25 89c5 8 17 8 22 0M73 89c5 8 17 8 22 0" />
        <path d="M43 37 76 20l7 14-34 17-6-14Z" />
        <path d="M80 20c10-1 20 3 27 11-9 7-19 8-29 3" />
      </svg>
    `,
    cups: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M26 24h44l-7 33c-3 14-27 14-30 0l-7-33Z" />
        <path d="M48 70v12M33 82h30" />
      </svg>
    `,
    swords: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 10v60" />
        <path d="M34 70h28" />
        <path d="M40 82h16" />
        <path d="M48 10 37 31h22L48 10Z" />
      </svg>
    `,
    pentacles: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M48 13 58 38h27L63 54l9 27-24-16-24 16 9-27-22-16h27z" />
      </svg>
    `,
    wands: `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M31 77 65 19" />
        <path d="M58 22c9 1 15 5 18 13-10 1-18-2-24-9" />
        <path d="M39 62c-8-1-14-5-17-12 9-1 16 2 22 8" />
      </svg>
    `,
  };

  return glyphs[key] || `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="30" />
      <circle cx="48" cy="48" r="10" />
      <path d="M48 18v60M18 48h60" />
    </svg>
  `;
}

function renderCardVisual(card, index, dict) {
  const visual = getCardVisualMeta(card.baseName);
  const image = typeof card.image === "string" && card.image.trim()
    ? card.image.trim()
    : "";
  const imageHtml = image
    ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(`${dict.cardImageAlt}: ${card.name}`)}" loading="lazy" />`
    : `
      <div class="tarot-art" data-suit="${escapeHtml(visual.suit)}" data-card="${escapeHtml(visual.key)}" aria-hidden="true">
        <span class="tarot-art-roman">${escapeHtml(card.baseName.split(" ")[0])}</span>
        <span class="tarot-art-rays"></span>
        <span class="tarot-art-symbol has-glyph">${renderCardGlyph(visual.key)}</span>
        <span class="tarot-art-mark"></span>
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

function buildLocalInterpretation(payload, dict) {
  const isRu = getCurrentLang() === "ru";
  const positions = Array.isArray(payload.positions) ? payload.positions : [];
  const cards = Array.isArray(payload.cards) ? payload.cards : [];
  const question = payload.question || dict.defaultQuestion;
  const firstCard = cards[0];
  const firstCardName = firstCard?.localizedName || firstCard?.name || "";
  const firstMeaning = firstCard?.meaning || "";
  const cardLines = positions
    .map((position, index) => {
      const card = cards[index] || {};
      const cardName = card.localizedName || card.name || `${index + 1}`;
      const meaning = card.meaning || "";
      const isReversed = Boolean(card.reversed);

      if (!isRu) {
        const orientationText = isReversed
          ? "The card points to a delay, doubt, or inner block that needs attention."
          : "The card points to an active resource and a direction you can lean on.";

        return `${position}
${cardName}

${meaning}

${orientationText} In this position, it shows what matters now and where the answer is already forming.`;
      }

      const orientationText = isReversed
        ? "Карта показывает задержку, сомнение или внутренний блок, который требует внимания."
        : "Карта показывает активный ресурс и направление, на которое можно опереться.";

      return `${position}
${cardName}

${meaning}

${orientationText} В этой позиции важно увидеть не только внешнее событие, но и своё состояние: там уже намечается ответ.`;
    })
    .join("\n\n");

  if (!cards.length) {
    return dict.errors.empty;
  }

  if (!isRu) {
    return `
Short answer
The main focus for "${question}" is ${firstCardName}. This card sets the tone of the spread: ${firstMeaning}

Card interpretation
${cardLines}

Overall result
The cards show where energy is moving and where it is stuck. The main task is to notice the lesson of the situation and choose one honest step instead of forcing an immediate outcome.

Advice
Do not try to solve everything at once. Choose one action that brings more truth and calm: ask directly, admit what you want, release control, or give yourself time.
`.trim();
  }

  return `
Краткий ответ
Главный акцент по вопросу «${question}» сейчас связан с картой ${firstCardName}. Она задаёт тон всему раскладу: ${firstMeaning}

Толкование карт
${cardLines}

Общий итог
Карты показывают, где энергия уже движется, а где она застревает. Сейчас важнее не искать жёсткий приговор, а увидеть главный урок ситуации и ближайший честный шаг.

Совет
Не пытайся решить всё сразу. Выбери одно действие, которое делает ситуацию честнее и спокойнее: задать прямой вопрос, признать своё желание, отпустить лишний контроль или дать себе время.
`.trim();
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

    if (response.status >= 500) {
      return buildLocalInterpretation(payload, dict);
    }

    if (!response.ok || data.error) {
      return data.details || data.error || dict.errors.server;
    }

    return typeof data.text === "string" && data.text.trim()
      ? data.text
      : dict.errors.empty;
  } catch (error) {
    if (error?.name === "AbortError") {
      return buildLocalInterpretation(payload, dict);
    }

    return buildLocalInterpretation(payload, dict);
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
  document.querySelector(".theme-icon")?.classList.toggle("is-dark", isDark);
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
  document
    .querySelector(".theme-icon")
    ?.classList.toggle("is-dark", document.body.classList.contains("dark-theme"));

  document.querySelectorAll("[data-spread]").forEach((button) => {
    button.addEventListener("click", () => drawSpread(button.dataset.spread));
  });

  applyTranslations();
});

window.drawSpread = drawSpread;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
