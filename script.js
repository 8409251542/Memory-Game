let cards = [
    { 'Name': "Apple", 'img': "https://th.bing.com/th/id/R.9c4d8dc9fb6e499ae567a455c6d9abcc?rik=xJzuU5VsKl%2bN8w&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-apple%2ftransparent-apple-21.png&ehk=0LDP56MKEPdTs%2bGgu%2fBTfq2yqFWK9CympqcCzj7GOs4%3d&risl=&pid=ImgRaw&r=0" },
    { 'Name': "grps", 'img': "https://w7.pngwing.com/pngs/997/412/png-transparent-bunch-of-white-grapes-muscat-wine-juice-concord-grape-grape-natural-foods-food-wine-thumbnail.png" },
    { 'Name': "mango", 'img': "https://w7.pngwing.com/pngs/981/456/png-transparent-mango-mango-food-citrus-orange-thumbnail.png" },
    { 'Name': "car", 'img': "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png" },
    { 'Name': "banana", 'img': "https://w7.pngwing.com/pngs/186/294/png-transparent-banana-a-banana-food-banana-leaves-cartoon-thumbnail.png" },
    { 'Name': "basket", 'img': "https://w7.pngwing.com/pngs/662/687/png-transparent-basketball-illustration-basketball-sports-equipment-sports-league-woodville-tompkins-institute-basketball-sport-orange-team-thumbnail.png" }
];

// Reference HTML elements
const countH = document.getElementById("count");
const parentDiv = document.getElementById("card-section");

// Duplicate the cards and shuffle them
const gameCards = cards.concat(cards);
let shuffleCards = Array.from(gameCards).sort(() => 0.5 - Math.random());

// Create the cards in the DOM
for (let i = 0; i < shuffleCards.length; i++) {
    const childDiv = document.createElement('div');
    childDiv.className = "card";
    childDiv.dataset.name = shuffleCards[i].Name;

    const frontDiv = document.createElement('div');
    frontDiv.classList.add('front-card');

    const backDiv = document.createElement('div');
    backDiv.classList.add('back-card');
    backDiv.style.backgroundImage = `url(${shuffleCards[i].img})`;

    parentDiv.appendChild(childDiv);
    childDiv.appendChild(frontDiv);
    childDiv.appendChild(backDiv);
}

// Game logic variables
let count = 0;
let clickCount = 0;
let firstCard = "";
let secondCard = "";
let firstCardElement = null;
let secondCardElement = null;

// Event listener for clicking on cards
parentDiv.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.card');
    
    // Prevent clicking the card multiple times or selecting matched cards
    if (!clickedCard || clickedCard.classList.contains("card_selected") || clickedCard.classList.contains("card_match")) {
        return;
    }
    
    clickCount++;
    clickedCard.classList.add("card_selected");  // Flip the card by showing back-card

    if (clickCount === 1) {
        firstCard = clickedCard.dataset.name;
        firstCardElement = clickedCard;
    } else if (clickCount === 2) {
        secondCard = clickedCard.dataset.name;
        secondCardElement = clickedCard;

        if (firstCard === secondCard) {
            // Cards match, keep them visible
            cardMatched();
        } else {
            // Cards don't match, hide them after a brief delay
            setTimeout(() => {
                firstCardElement.classList.remove("card_selected");
                secondCardElement.classList.remove("card_selected");
                resetGame();  // Reset for next round
            }, 1000);
        }

        count++;
        countH.innerHTML = `${count}`;
    }
});

// Function to handle matched cards
const cardMatched = () => {
    firstCardElement.classList.add("card_match");
    secondCardElement.classList.add("card_match");
    resetGame();  // Reset for next round
};

// Function to reset the game state after each attempt
const resetGame = () => {
    clickCount = 0;
    firstCard = "";
    secondCard = "";
    firstCardElement = null;
    secondCardElement = null;
};
