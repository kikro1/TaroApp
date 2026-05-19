const galleryTranslations = {
  ru: {
    title: "Галерея карт",
    eyebrow: "Полная колода",
    description: "Все 78 карт с прямыми и перевёрнутыми значениями.",
    backToReading: "К раскладу",
    galleryNav: "Галерея",
    searchLabel: "Поиск карты",
    searchPlaceholder: "Название или значение",
    suitLabel: "Раздел",
    allCards: "Все карты",
    majorArcana: "Старшие арканы",
    wands: "Жезлы",
    cups: "Кубки",
    swords: "Мечи",
    pentacles: "Пентакли",
    upright: "Прямое значение",
    reversed: "Перевёрнутое значение",
    cardsCount: (count, total) => `Показано ${count} из ${total} карт`,
    empty: "Карты не найдены.",
  },
  en: {
    title: "Card Gallery",
    eyebrow: "Complete deck",
    description: "All 78 cards with upright and reversed meanings.",
    backToReading: "Back to reading",
    galleryNav: "Gallery",
    searchLabel: "Search cards",
    searchPlaceholder: "Name or meaning",
    suitLabel: "Section",
    allCards: "All cards",
    majorArcana: "Major Arcana",
    wands: "Wands",
    cups: "Cups",
    swords: "Swords",
    pentacles: "Pentacles",
    upright: "Upright meaning",
    reversed: "Reversed meaning",
    cardsCount: (count, total) => `Showing ${count} of ${total} cards`,
    empty: "No cards found.",
  },
};

function getGalleryDictionary() {
  return galleryTranslations[getCurrentLang()] || galleryTranslations.ru;
}

function getGallerySuit(cardName) {
  const name = String(cardName).toLowerCase();

  if (name.includes("wand")) return "wands";
  if (name.includes("cup")) return "cups";
  if (name.includes("sword")) return "swords";
  if (name.includes("pentacle")) return "pentacles";

  return "major";
}

function renderGalleryCard(card, index) {
  const dict = getGalleryDictionary();
  const localizedName = getLocalizedCardName(card.name, false, getCurrentLang());
  const visualCard = {
    baseName: card.name,
    name: card.name,
    image: card.image,
    reversed: false,
  };

  return `
    <article class="gallery-card" style="--deal-index: ${index}">
      ${renderCardVisual(visualCard, index, { cardImageAlt: dict.title })}
      <div class="gallery-card-copy">
        <div class="card-pos">${escapeHtml(dict[getGallerySuit(card.name)] || dict.majorArcana)}</div>
        <h2 class="card-name">${escapeHtml(card.name)}</h2>
        ${localizedName ? `<div class="card-name-ru">${escapeHtml(localizedName)}</div>` : ""}

        <div class="meaning-block">
          <h3>${escapeHtml(dict.upright)}</h3>
          <p>${escapeHtml(card.upright)}</p>
        </div>

        <div class="meaning-block">
          <h3>${escapeHtml(dict.reversed)}</h3>
          <p>${escapeHtml(card.reversed)}</p>
        </div>
      </div>
    </article>
  `;
}

function applyGalleryTranslations() {
  const dict = getGalleryDictionary();

  document.querySelectorAll("[data-gallery-i18n]").forEach((element) => {
    const key = element.getAttribute("data-gallery-i18n");
    if (typeof dict[key] === "string") {
      element.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-gallery-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-gallery-placeholder");
    if (typeof dict[key] === "string") {
      element.placeholder = dict[key];
    }
  });

  document.title = `Tarot - ${dict.title}`;
}

function renderGallery() {
  const gallery = document.getElementById("cardsGallery");
  const count = document.getElementById("galleryCount");
  const dict = getGalleryDictionary();
  const cards = getAvailableCards();
  const query = document.getElementById("cardSearch")?.value.trim().toLowerCase() || "";
  const suit = document.getElementById("suitFilter")?.value || "all";

  const filteredCards = cards.filter((card) => {
    const localizedName = getLocalizedCardName(card.name, false, getCurrentLang());
    const haystack = [
      card.name,
      localizedName,
      card.upright,
      card.reversed,
      getGallerySuit(card.name),
    ]
      .join(" ")
      .toLowerCase();

    return (suit === "all" || getGallerySuit(card.name) === suit) && haystack.includes(query);
  });

  count.textContent = dict.cardsCount(filteredCards.length, cards.length);
  gallery.innerHTML = filteredCards.length
    ? filteredCards.map(renderGalleryCard).join("")
    : `<div class="panel gallery-empty">${escapeHtml(dict.empty)}</div>`;
}

window.addEventListener("DOMContentLoaded", () => {
  applyGalleryTranslations();
  renderGallery();

  document.getElementById("cardSearch")?.addEventListener("input", renderGallery);
  document.getElementById("suitFilter")?.addEventListener("change", renderGallery);
  document.getElementById("langSelect")?.addEventListener("change", () => {
    window.setTimeout(() => {
      applyGalleryTranslations();
      renderGallery();
    }, 0);
  });
});
