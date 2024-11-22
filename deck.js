class Deck {
    #cardsImages = ["bells.jpg", "bird.jpg", "candle.jpg", "candy.jpg", "christmastree.jpg", "sled.jpg",
        "snowman.jpg", "snowman2.jpg", "snowmananddeer.jpg"];

    constructor() {
        this.cards = [];
        this.#cardsImages.forEach(image => {  //метод добавляет по две карты в массив cards
            this.cards.push(new Card (image));
            this.cards.push(new Card (image));
        })
    }

    shuffle() {  //перетасовали карты
        this.cards.sort(() => Math.random() - 0.5);
    }

    removeCard(card) {  //на вход принимает карту потом поиск карты по индексу
        let index = this.cards.findIndex(item => item.imagePath == card.imagePath);
        if (index != -1) {  // если нашли карту из масива ее удалить и отсоедини ть от дом дерева
            this.cards.splice(index, 1);
            card.disconectFromDOM();
        }

    }


}