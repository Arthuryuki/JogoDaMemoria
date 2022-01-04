const tabuleiro = document.querySelector("#tabuleiro");

const images = {
  angular: "angular.png",
  cc: "cc.png",
  css: "css.png",
  html: "html.png",
  js: "js.png",
  nodejs: "nodejs.png",
  python: "python.png",
  react: "react.png",
};

class Card {
  constructor(image, id) {
    this.image = image;
    this.id = id;
    this.flipped = true;
    this.matched = false;
  }

  flip() {
    if (this.flipped || this.matched) return false;
    this.flipped = !this.flipped;
  }
}


let cards = [
  new Card(images.angular, "angular"),
  new Card(images.angular, "angular-2"),
  new Card(images.cc, "cc"),
  new Card(images.cc, "cc-2"),
  new Card(images.css, "css"),
  new Card(images.css, "css-2"),
  new Card(images.html, "html"),
  new Card(images.html, "html-2"),
  new Card(images.js, "js"),
  new Card(images.js, "js-2"),
  new Card(images.nodejs, "nodejs"),
  new Card(images.nodejs, "nodejs-2"),
  new Card(images.python, "python"),
  new Card(images.python, "python-2"),
  new Card(images.react, "react"),
  new Card(images.react, "react-2"),
];

function renderCards() {
  tabuleiro.innerHTML = "";
  cards.forEach((card) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("flip-card");
    const cardInner = document.createElement("div");
    cardInner.classList.add("flip-card-inner");
    const frontWrapper = document.createElement("div");
    frontWrapper.classList.add("flip-card-front");
    const backWrapper = document.createElement("div");
    backWrapper.classList.add("flip-card-back");
    const front = document.createElement("img");
    const back = document.createElement("img");
    front.classList.add("card-image");
    back.classList.add("card-image");
    front.src = `imagens/${card.image}`;
    back.src = "imagens/baralho.jpg";
    frontWrapper.appendChild(front);
    backWrapper.appendChild(back);
    cardInner.appendChild(frontWrapper);
    cardInner.appendChild(backWrapper);
    if (!card.flipped) {
      cardInner.classList.add("flipped");
    } else {
      cardInner.classList.remove("flipped");
    }
    cardWrapper.appendChild(cardInner);

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.classList.add("col-3");
    cardElement.classList.add("p-0");
    cardElement.classList.add("m-0");
    cardElement.classList.add("d-flex");
    cardElement.classList.add("justify-content-center");
    cardElement.classList.add("align-items-center");
    cardElement.dataset.id = card.id;
    cardElement.appendChild(cardWrapper);
    tabuleiro.appendChild(cardElement);
  });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

let selectedCardId = "";
let matches = 0;
let startTime;

let allowClick = true;

function startListeners() {
  tabuleiro.addEventListener("click", (event) => {
    if (!allowClick) return;
    const card = event.target.closest(".card");
    const id = card.dataset.id;
    if (selectedCardId) allowClick = false;
    const cardToFlip = cards.find((card) => card.id === id);
    if (cardToFlip.matched) return;
    if (!selectedCardId) {
      selectedCardId = id;
      cardToFlip.flipped = true;
      event.target.closest(".flip-card-inner").classList.toggle("flipped");
      setTimeout(() => {
        renderCards();
      }, 800);
    } else {
      if (selectedCardId === id) {
        return alert("Selecione duas cartas diferentes");
      }
      cardToFlip.flipped = true;
      event.target.closest(".flip-card-inner").classList.toggle("flipped");
      setTimeout(() => {
        renderCards();
      }, 800);

      // Using timout so we can see the card flipped
      setTimeout(() => {
        if (id.split("-")[0] !== selectedCardId.split("-")[0]) {
          cardToFlip.flipped = false;
          event.target.closest(".flip-card-inner").classList.toggle("flipped");
          cards.find((card) => card.id === selectedCardId).flipped = false;
          selectedCardId = "";
          renderCards();
          alert("Cartas diferentes");
        } else {
          cards.find((card) => card.id === selectedCardId).matched = true;
          cardToFlip.matched = true;
          selectedCardId = "";
          alert("acertou");
          matches++;
        }
        if (matches === cards.length / 2) {
          var diff = Math.abs(startTime - new Date());
          var seconds = Math.floor(diff / 1000);
          alert(
            `Você levou ${
              seconds > 60 ? `${seconds / 60} minutos` : `${seconds} segundos`
            } para completar o jogo`
          );
        }
        allowClick = true;
      }, 1500);
    }
  });
}

function startGame() {
  shuffle(cards);
  renderCards();
  setTimeout(() => {
    cards.forEach((card) => {
      card.flipped = false;
    });
    renderCards();
    startListeners();
    startTime = new Date();
  }, 3000);
}

renderCards();
