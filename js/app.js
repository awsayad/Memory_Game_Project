// All cards in one single line array
const card = document.getElementsByClassName("card");
const cards = [...card]

// cards deck of the game
const deck = document.getElementById("deck");

//variable to store open cards
const OpenCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// shuffles cards when page is loads
document.body.onload = shuffleBoard();

function shuffleBoard() {
    let deckArray = [];
    shuffledCards = shuffle(cards);

    // iterate over shuffled card array and append each card html into new deck list
    for (let cardCounts = 0; cardCounts < shuffledCards.length; cardCounts++) {
        //deck.innerHTML = "";
        deckArray.forEach.call(shuffledCards, function (card) {
            deck.appendChild(card);
        });
        //test[i].classList.remove("show", "open", "match", "disabled");
    }
}

// iterate over each card and flip cards when clicked
for (const clickedCard of cards) {
    clickedCard.addEventListener('click', function () {
        OpenCards.push(card);
        clickedCard.classList.add('open', 'show');
        console.log('card open:', OpenCards.length);
    })
}