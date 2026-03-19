let who_iam_cards = document.getElementsByClassName("who-iam-card");

for (let i =  0; i < who_iam_cards.length; i++) {
    who_iam_cards[i].addEventListener("click", (() => handleClickCard(who_iam_cards[i])))
}

function handleClickCard(card) {
    console.log("card clicked -> ", card.id);
    const card_1 = document.getElementById("who-iam-card-1")
    const card_2 = document.getElementById("who-iam-card-2")

    const changeCardView = (primary_card, secondary_card) => {
        primary_card.style.zIndex = 2;
        primary_card.style.marginTop = "0%";
        primary_card.style.left = "15%";
        
        secondary_card.style.zIndex = 1;
        secondary_card.style.marginTop = "5%";
        secondary_card.style.left = "30%"
    }

    switch (card.id) {
        case "who-iam-card-1":
            changeCardView(card_1, card_2);
            break;
        case "who-iam-card-2":
            changeCardView(card_2, card_1)
            break;    
        default:
            break;
    }
}
