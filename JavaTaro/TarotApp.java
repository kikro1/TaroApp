import java.util.Scanner;

public class TarotApp {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        TarotDeck deck = new TarotDeck();

        while (true) {
            System.out.println("\n=== ТАРО ПРИЛОЖЕНИЕ ===");
            System.out.println("1. Вытянуть 1 карту (ответ / совет)");
            System.out.println("2. Расклад на 3 карты (прошлое–настоящее–будущее)");
            System.out.println("3. Кельтский крест (10 карт)");
            System.out.println("4. Любовный расклад (6 карт)");
            System.out.println("5. Да / Нет (1 карта)");
            System.out.println("6. Расклад 'Путь' (5 карт)");
            System.out.println("0. Выход");
            System.out.print("Ваш выбор: ");

            int choice;
            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (Exception e) {
                System.out.println("Введите число.");
                continue;
            }

            switch (choice) {
                case 1 -> Spread.oneCard(deck);
                case 2 -> Spread.threeCards(deck);
                case 3 -> Spread.celticCross(deck);
                case 4 -> Spread.loveSpread(deck);
                case 5 -> Spread.yesNo(deck);
                case 6 -> Spread.pathSpread(deck);
                case 0 -> {
                    System.out.println("До встречи, Мой Господин.");
                    return;
                }
                default -> System.out.println("Неверный выбор, попробуйте ещё.");
            }
        }
    }
}