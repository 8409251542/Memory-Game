let cards = [
    {
        'Name': "Apple",
        'img': "https://w7.pngwing.com/pngs/973/255/png-transparent-red-apple-apple-fruit-apple-natural-foods-food-grocery-store-thumbnail.png"
    }, {
        'Name': "grps",
        'img': "https://w7.pngwing.com/pngs/997/412/png-transparent-bunch-of-white-grapes-muscat-wine-juice-concord-grape-grape-natural-foods-food-wine-thumbnail.png"
    }, {
        'Name': "mango",
        'img': "https://w7.pngwing.com/pngs/981/456/png-transparent-mango-mango-food-citrus-orange-thumbnail.png"
    }, {
        'Name': "car",
        'img': "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png"
    }, {
        'Name': "banana",
        'img': "https://w7.pngwing.com/pngs/186/294/png-transparent-banana-a-banana-food-banana-leaves-cartoon-thumbnail.png"
    }, {
        'Name': "basket",
        'img': "https://w7.pngwing.com/pngs/662/687/png-transparent-basketball-illustration-basketball-sports-equipment-sports-league-woodville-tompkins-institute-basketball-sport-orange-team-thumbnail.png"
    }
]

const parentDiv = document.getElementById("card-section");
const gameCrads = cards.concat(cards);
let sufflecard = Array.from(gameCrads).sort(() => 0.5 - Math.random());
for (let i = 0; i < sufflecard.length; i++) {
    const chaildDiv = document.createElement('div');
    chaildDiv.className = "card";
    chaildDiv.dataset.name = sufflecard[i].Name;
    chaildDiv.style.backgroundImage = `url(${sufflecard[i].img})`;
    parentDiv.appendChild(chaildDiv);
}
let clickCount = 0;
let fCard = "";
let sCard = "";
parentDiv.addEventListener('click', (e) => {
    let curCard = e.target;
    if (curCard.id === "card-section") {
        return false;
    }
    clickCount++;
    if (clickCount < 3) {
        if (clickCount === 1) {
            fCard = curCard.dataset.name;
            curCard.classList.add("card_selected");
        } else {
            sCard = curCard.dataset.name;
            curCard.classList.add("card_selected");
        }
        if (fCard !== '' && sCard !== '') {
            if (fCard === sCard) {
                curCard.classList.add("card_match");
                card_matched();
                resetGame();
            } else {
                resetGame();
            }
        }
    }

})
const resetGame=()=>{
    let card_selected = document.querySelectorAll('.card_selected');
                card_selected.forEach((curEle) => {
                    curEle.classList.remove('card_selected');
                })
                clickCount = 0;
                fCard = "";
                sCard = "";
}
const card_matched = () => {
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((curEle) => {
        curEle.classList.add('card_match');
    })
}