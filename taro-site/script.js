function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function reversed() {
    return Math.random() > 0.5;
}

function drawSpread(type) {
    let count = 1;

    switch(type) {
        case "one": count = 1; break;
        case "three": count = 3; break;
        case "love": count = 6; break;
        case "path": count = 5; break;
        case "celtic": count = 10; break;
        case "yesno": count = 1; break;
    }

    const shuffled = shuffle([...tarotCards]);
    const selected = shuffled.slice(0, count);

    let output = `<h2>Результат расклада</h2>`;

    const labels = {
        one: ["Ответ / совет"],
        three: ["Прошлое", "Настоящее", "Будущее"],
        love: ["Вы", "Партнёр", "Связь", "Проблемы", "Сила", "Будущее"],
        path: ["Где вы", "Препятствия", "Ресурсы", "Совет", "Итог"],
        celtic: [
            "Суть", "Препятствия", "Основа", "Прошлое", "Сознательное",
            "Будущее", "Вы", "Окружение", "Страхи", "Итог"
        ],
        yesno: ["Карта"]
    };

    selected.forEach((card, i) => {
        let rev = reversed();
        output += `
            <div class="card">
                <div class="card-pos">${labels[type][i]}</div>
                <div class="card-name">${card.name} ${rev ? "(Перевёрнутая)" : ""}</div>
                <div>${rev ? card.reversed : card.upright}</div>
            </div>
        `;
    });

    document.getElementById("result").innerHTML = output;
}