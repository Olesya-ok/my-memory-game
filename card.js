class Card {
    #image;
   #element;   // дом узел который представляет карту
    #isFlipped = false;

    constructor(image) {
        this.#image = image;

        this.#element = document.createElement("div");
        this.#element.classList.add("card");
        this.#element.style.backgroundImage = `url('${this.coverPath}')`;
        this.#element.connectedCard = this;   //текущий экземпляр который описывает результат работы с карточкой

    }

    get imagePath(){   // свойство определяет пусть к изображению, которое находится с обратной стороны bg
        return `images/${this.#image}`   //правильный путь для разметки
    }

    get coverPath() {
        return 'images/background.jpg'
    }

    get element() {      //доступ к элелм который отображает карточку
        return this.#element;
    }

    flip (){   //при клике определяем какая сторона рубаха ил картинка
        if (this.#isFlipped)
            this.#element.style.backgroundImage = `url('${this.coverPath}')`;
        else
            this.#element.style.backgroundImage = `url('${this.imagePath}')`;

        this.#isFlipped = !this.#isFlipped;   //всегда меняем на противоположный
    }

    disconectFromDOM() {   // карточка перестанет быть связана с дом элем в самом дом дереве, какрточка перестанет
        // быть интерактивной но не удалится посностью
        this.#element.connectedCard = null
    }

}

