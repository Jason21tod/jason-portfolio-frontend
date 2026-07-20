let cards_queue = Array.from(document.getElementsByClassName("build-section-card"));
let card_index = 0;
let next_cards = Array.from(cards_queue).slice(1);

let current_card = cards_queue[card_index];
let buttons = Array.from(document.getElementsByClassName('build-section-btn'));


buttons[0].style.display = "None"
buttons[0].addEventListener('click', () => {handleBuildChange(true)});
buttons[1].addEventListener('click', () => {handleBuildChange(false)});


next_cards.forEach(element => {
    element.style.display = "None"
});


function handleBuildChange(invert=true){
    let card_coeficient = invert? -1 : +1;
    if (card_index == cards_queue.length-1 && card_coeficient == -1){
        card_index = card_index + card_coeficient
        updateCards()
        return
    }
    if (card_index == cards_queue.length-1){
        card_index = 0;
        updateCards();
        return
    } else {
        card_index = card_index + card_coeficient;
    }

    updateCards()

    function updateCards () {

        if (card_index != 0) {
            buttons[0].style.display = "unset"
        }
        else {
            buttons[0].style.display = "None"
        }

        if (card_index < cards_queue.length-1) {
            buttons[1].style.display = "unset"
        } else {
            buttons[1].style.display = "None"
        }
        
        // current_card.style.opacity = "0%";
        current_card.style.display = "absolute";
        current_card.style.right ="100%";
        setTimeout(() => {
            current_card.style.display = "None";
            current_card = cards_queue[card_index];
            
            current_card.style.opacity = "100%";
            current_card.style.display = "inline-block";
        }, 200);
    }
}
