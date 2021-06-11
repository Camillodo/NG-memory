const cards = document.querySelectorAll('.memory_card');

function flipCard (){
this.classList.toggle('flipped')
}


cards.forEach(card => {card.addEventListener('click', flipCard)})