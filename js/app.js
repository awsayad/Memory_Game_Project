//All cards in single line array
let card = document.getElementsByClassName('card');
const cards = [...card];

// cards board
const deck = document.getElementById('deck');

//Open cards array
let openCards = [];
let matchedCounter = 0;

// number of Moves variable
let moves = 0;
let movesCounter = document.querySelector('.moves');

// Timer variables
let sec = 0;
let min = 0;
let hr = 0;
var timeInterval;
let timerCounter = document.querySelector('.timer');

// Star rate variables
var starRate;

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

// start game by loading page
document.body.onload = startGame();

//Start game function
function startGame() {
    let deckArray = [];
    const shuffledCards = shuffle(cards);

    // iterate over shuffled cards and append each card html into the new deck array
    for (let cardCounts = 0; cardCounts < shuffledCards.length; cardCounts++) {
        deckArray.forEach.call(shuffledCards, function (card) {
            deck.appendChild(card);
            cards[cardCounts].classList.remove('match', 'disable');
        });
    }

    //reset Moves counter
    moves = 0;
    movesCounter.innerHTML = moves;

    //reset timer
    sec = 0;
    min = 0;
    hr = 0;
    timerCounter = document.querySelector('.timer');
    timerCounter.innerHTML = `<strong>${hr}:Hr</strong><strong>${min}:Min</strong><strong>${sec}:Sec</strong>`;
    clearInterval(timeInterval);

    //reset stars rating
    let star1 = document.getElementById('star1');
    star1.style.color = '';
    let star2 = document.getElementById('star2');
    star2.style.color = '';
    let star3 = document.getElementById('star3');
    star3.style.color = '';
    starRate = 0;
}

//Flip Cards when clicked
const displayCards = function () {
    this.classList.add('open', 'show', 'disable');
}

//Store open cards in temp array and check if matched or not
const openedCard = function () {
    openCards.push(this);
    if (openCards.length === 2) {
        movesCount();
        if (openCards[0].type == openCards[1].type) {
            matched();
        }
        else {
            unmatched();
        }
    }
}

//matching cards
const matched = function () {
    matchedCounter += 1;
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');

    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards = []
}

//unmatched cards
const unmatched = function () {
    setTimeout(function () {
        openCards[0].classList.remove('open', 'show', 'disable');
        openCards[1].classList.remove('open', 'show', 'disable');
        openCards = []
    }, 200);
}

// number of moves function
const movesCount = function () {
    moves += 1;
    movesCounter.innerHTML = `<strong>${moves} </strong>`;
    timer();
}

//timer function
function timer() {
    if (moves == 1) {
        timeInterval = setInterval(function () {
            sec++;
            if (sec == 60) {
                min++;
                sec = 0;
            }
            else if (min == 60) {
                hr++
                min = 0;
                sec = 0;
            }
            timerCounter.innerHTML = `<strong>${hr}:Hr</strong><strong>${min}:Min</strong><strong>${sec}:Sec</strong>`;
        }, 1000);
    }
}

// Star Rating function
const starRating = function () {
    if (moves <= 10) {
        let star1 = document.getElementById('star1');
        star1.style.color = 'red';
        let star2 = document.getElementById('star2');
        star2.style.color = 'red';
        let star3 = document.getElementById('star3');
        star3.style.color = 'red';
        starRate = 3;
    }
    else if (moves <= 15) {
        let star1 = document.getElementById('star1');
        star1.style.color = 'red';
        let star2 = document.getElementById('star2');
        star2.style.color = 'red';
        starRate = 2;
    }
    else if (moves >= 16) {
        let star1 = document.getElementById('star1');
        star1.style.color = 'red';
        starRate = 1;
    }

}

// Winning the game modal (not complete)
const winGame = function () {
    if (matchedCounter === 8) {
        starRating();

        // The Modal from https://www.w3schools.com/howto/howto_css_modals.asp
        let modal = document.getElementById('myModal');
        let modalContent = document.querySelector('.modal-content')
        let htmlTextToAdd = `Congratulations, you Won with ${moves} Moves, and ${starRate} Star(s)`;
        modalContent.insertAdjacentHTML('beforeend', htmlTextToAdd);

        //create "Play Again" button
        let btnToAdd = `<button id="myBtn">Play Again</button>`
        modalContent.insertAdjacentHTML('beforeend', btnToAdd);
        modal.style.display = "block";

        // When the user clicks the button, reset the game
        let btn = document.getElementById("myBtn");
        btn.onclick = function () {
            modal.style.display = "none";
            startGame();
        }
        matchedCounter = 0;
    }
}

// add event listner to each card
for (let clickedCard of cards) {
    clickedCard.addEventListener('click', displayCards);
    clickedCard.addEventListener('click', openedCard);
    clickedCard.addEventListener('click', winGame);
}
