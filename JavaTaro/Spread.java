import java.util.List;

public class Spread {

    private static void printCard(TarotDeck deck, TarotCard card, String position) {
        boolean reversed = deck.isReversed();

        System.out.println();
        System.out.println("Позиция: " + position);
        System.out.println("Карта: " + card.getName() + (reversed ? " (перевёрнутая)" : " (прямая)"));
        System.out.println("Значение:");
        System.out.println(reversed ? card.getReversedMeaning() : card.getUprightMeaning());
    }

    // 1 карта
    public static void oneCard(TarotDeck deck) {
        deck.shuffle();
        TarotCard card = deck.drawCards(1).get(0);
        System.out.println("\n=== Расклад: 1 карта (Ответ / совет) ===");
        printCard(deck, card, "Ответ / совет");
    }

    // 3 карты: прошлое-настоящее-будущее
    public static void threeCards(TarotDeck deck) {
        deck.shuffle();
        List<TarotCard> cards = deck.drawCards(3);

        System.out.println("\n=== Расклад: 3 карты (Прошлое–Настоящее–Будущее) ===");
        printCard(deck, cards.get(0), "Прошлое / истоки ситуации");
        printCard(deck, cards.get(1), "Настоящее / текущая энергия");
        printCard(deck, cards.get(2), "Будущее / возможный исход");
    }

    // Кельтский крест (10 карт)
    public static void celticCross(TarotDeck deck) {
        deck.shuffle();
        List<TarotCard> c = deck.drawCards(10);

        System.out.println("\n=== Расклад: Кельтский крест (10 карт) ===");
        printCard(deck, c.get(0), "1. Суть вопроса");
        printCard(deck, c.get(1), "2. Препятствия / что мешает");
        printCard(deck, c.get(2), "3. Основа, корень ситуации");
        printCard(deck, c.get(3), "4. Прошлое, что привело сюда");
        printCard(deck, c.get(4), "5. Сознательное / ожидания / вершина");
        printCard(deck, c.get(5), "6. Ближайшее будущее");
        printCard(deck, c.get(6), "7. Вы, внутреннее состояние");
        printCard(deck, c.get(7), "8. Окружение, внешние влияния");
        printCard(deck, c.get(8), "9. Страхи и надежды");
        printCard(deck, c.get(9), "10. Итог / вероятный исход");
    }

    // Любовный расклад (6 карт)
    public static void loveSpread(TarotDeck deck) {
        deck.shuffle();
        List<TarotCard> c = deck.drawCards(6);

        System.out.println("\n=== Любовный расклад (6 карт) ===");
        printCard(deck, c.get(0), "1. Вы в отношениях / в любви");
        printCard(deck, c.get(1), "2. Партнёр / потенциальный партнёр");
        printCard(deck, c.get(2), "3. Что между вами / основная энергия связи");
        printCard(deck, c.get(3), "4. Сложности / слабые стороны связи");
        printCard(deck, c.get(4), "5. Поддержка / сильные стороны связи");
        printCard(deck, c.get(5), "6. Возможное будущее отношений");
    }

    // Да / Нет (простая логика)
    public static void yesNo(TarotDeck deck) {
        deck.shuffle();
        TarotCard card = deck.drawCards(1).get(0);
        boolean reversed = deck.isReversed();

        System.out.println("\n=== Расклад: Да / Нет (1 карта) ===");
        System.out.println("Карта: " + card.getName() + (reversed ? " (перевёрнутая)" : " (прямая)"));
        System.out.println("Значение:");
        System.out.println(reversed ? card.getReversedMeaning() : card.getUprightMeaning());

        String name = card.getName();

        boolean positive =
                name.contains("The Sun") ||
                name.contains("The World") ||
                name.contains("The Star") ||
                name.contains("The Lovers") ||
                name.contains("The Magician") ||
                name.contains("Ace of Cups") ||
                name.contains("Ace of Pentacles") ||
                name.contains("Six of Wands") ||
                name.contains("Ten of Cups");

        boolean negative =
                name.contains("The Tower") ||
                name.contains("Death") ||
                name.contains("The Devil") ||
                name.contains("Three of Swords") ||
                name.contains("Five of Pentacles") ||
                name.contains("Ten of Swords");

        System.out.println();
        if (positive && !reversed && !negative) {
            System.out.println("Ответ карт: ДА (благоприятная карта в прямом положении).");
        } else if (negative || (positive && reversed)) {
            System.out.println("Ответ карт: НЕТ (сложная или перевёрнутая энергия карты).");
        } else {
            System.out.println("Ответ карт: неоднозначно, лучше вытянуть ещё одну карту или использовать другой расклад.");
        }
    }

    // Расклад "Путь" (5 карт)
    public static void pathSpread(TarotDeck deck) {
        deck.shuffle();
        List<TarotCard> c = deck.drawCards(5);

        System.out.println("\n=== Расклад: Путь (5 карт) ===");
        printCard(deck, c.get(0), "1. Где вы сейчас / отправная точка");
        printCard(deck, c.get(1), "2. Препятствия на пути");
        printCard(deck, c.get(2), "3. Поддержка, ресурсы, что помогает");
        printCard(deck, c.get(3), "4. Совет / что делать");
        printCard(deck, c.get(4), "5. Возможный итог пути");
    }
}