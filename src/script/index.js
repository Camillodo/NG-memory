
// We first target all the memory cards
const cards = document.querySelectorAll('.memory-card');

//By default a card has not flipped
let hasFlippedCard = false;
// We use lock board to ensure that the user is not going to flip another set of cards during the check for match
let lockBoard = false;
// We create two variables the first card and the second
let firstCard, secondCard;

function flipCard() {
  //if lockBoard is on  we return
  if (lockBoard) return;
  // we return if this equals the first values because it means the user has clicked twice on the first card
  if (this === firstCard) return;
  //we add the flip class
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    // first card is then the element that fired the event so this
    firstCard = this;
    return;
  }
  // if we are here the trigger is the second card so we check for match
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // we check if the first card data number is the same as the second card
  let isMatch = firstCard.dataset.number === secondCard.dataset.number;
  // if so we use disableCards to remove the events and lock the unflipCards
  //if not we continue
  isMatch ? disableCards() : unflipCards();
}


// if it is a match disableCards is called
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}


function unflipCards() {
  // we lock the board during the unflipping so the user unflip just two cards
  lockBoard = true;
  setTimeout(() => {
    // we remove the css class so the cards are not visible
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    // the values are set to default values
    resetBoard();
  }, 1500);
}

function resetBoard() {
  // we reinitialize the values
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


// shuffle is an auto invoked function that triggers each time the page is rendered
// we use the order property of flexbox to determine which cards go where.
// The order is shuffled by a simple mathrandom
(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

// a forEach to add events listeners to each cards
cards.forEach(card => card.addEventListener('click', flipCard));