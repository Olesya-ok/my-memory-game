class GameManager {
    #boardElement;  //отображает карточки виртуальная доска
    #scoreElement;  // отображ номер попытки
    #deck = new Deck();  // вирт колода
    #firstCard = null;  // поля с карточками которые выбрали
    #secondCard = null;
    #attemptNumber = 0;  // счетчик попыток

    constructor (board, score) {
        if (typeof board === "string") {
            this.#boardElement = document.querySelector(board);
        } else {
            this.#boardElement = board;
        }

        if (typeof score === "string") {
            this.#scoreElement = document.querySelector(score);
        } else {
            this.#scoreElement = score;
        }
    }

    startGame() {
        this.#deck = new Deck();
        this.#attemptNumber = "";
        this.#boardElement.innerHTML = "";
        this.shuffleAndDeal();//  перетасовать т разложить карты
    }

    shuffleAndDeal() {
        this.#deck.shuffle();
        this.#deck.cards.forEach(card => {
            this.#boardElement.append(card.element);
        });
    }

    selectCard(card) {
        if (card == this.#firstCard) return; // если второй раз нажали на одну и туже карту, ничего не делаем (метод дальше не выполняем)
        card.flip(); // переворачиваем карту

        // если есть значения в двух полях, значит предыдущие две карты не совпали
        // переворачиваем их рубашкой вверх
        if (this.#firstCard && this.#secondCard) {
            this.#firstCard.flip();
            this.#secondCard.flip();

            this.#firstCard = this.#secondCard = null;
        }

        // Если выбрана одна карта запоминаем ее и ждем вторую
        if (this.#firstCard == null) {
            this.#firstCard = card;
        }

        else if (this.#secondCard == null) {
            this.attemptNumber++;
            this.#secondCard = card;

            // если найдены карты с одинаковым изображением
            if (this.#firstCard.imagePath === card.imagePath) {
                this.#deck.removeCard(this.#firstCard); // убираем карты из колоды (они остаются в DOM дереве)
                this.#deck.removeCard(this.#secondCard);

                this.#firstCard = this.#secondCard = null;
            }
        }
    }

    get attemptNumber() {
        return this.#attemptNumber;
    }

    set attemptNumber(value) {
        this.#attemptNumber = value;
        this.#scoreElement.innerHTML = value;
    }
}

