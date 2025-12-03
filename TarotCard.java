public class TarotCard {
    private final String name;             // например: "0 The Fool"
    private final String uprightMeaning;   // значение в прямом положении
    private final String reversedMeaning;  // значение в перевёрнутом положении

    public TarotCard(String name, String uprightMeaning, String reversedMeaning) {
        this.name = name;
        this.uprightMeaning = uprightMeaning;
        this.reversedMeaning = reversedMeaning;
    }

    public String getName() {
        return name;
    }

    public String getUprightMeaning() {
        return uprightMeaning;
    }

    public String getReversedMeaning() {
        return reversedMeaning;
    }
}