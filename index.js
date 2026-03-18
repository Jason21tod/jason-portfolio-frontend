document.getElementById("nav-button").addEventListener("click", handleMenuToggle);

// alert("Atenção, site em manutenção, muitas coisas aqui ainda não estão prontas, você foi avisado!");

let menu_exit_area = document.getElementById("menu-exit-area");
menu_exit_area.addEventListener("click", handleMenuToggle);


let projects_container = document.getElementById("project-section-container");
let projects = new Array();

updateProjectCard(projects_container.childNodes[1]);
// console.log(projects_container.getBoundingClientRect().x)
projects_container.addEventListener("scroll", () => {
    // console.log(projects_container.getBoundingClientRect().x);
        projects.forEach(element => {
            console.log(element.id, " ", element.getBoundingClientRect().x)
            updateProjectCard(element);
    })
});

function updateProjectCard(element) {
    console.log(element)
    if (element.getBoundingClientRect().x >= 0 && element.getBoundingClientRect().x <= 90) {
                element.style.backgroundColor = "#1B1B33";
                element.style.height = "100%";
                element.childNodes[5].style.opacity = "100%";
                element.childNodes[3].style.opacity = "100%";
            } else {
                element.style.height = "40%";
                element.childNodes[5].style.opacity = "0%";
                element.childNodes[3].style.opacity = "0%";
            }
}

Array.from(projects_container.childNodes).forEach(element => {
    if (element.nodeName == "DIV" && !  projects.includes(element)) {
        projects.push(element);
        console.log(projects);
    }
});



let menu_active = false;
let menu_buttons = document.getElementsByClassName("nav-component");
menu_buttons = Array.from(menu_buttons);

for (let i = 0; i < menu_buttons.length; i++) {
    menu_buttons[i].addEventListener("click",  handleMenuToggle)
}

function handleMenuToggle() {
    let menu = document.getElementsByClassName("header-bar")[0];

    menu_active?  menu.style.right= "100%": menu.style.right = "10%";
    if (menu_active === false) {
        menu_active = true
        menu_exit_area.style.display = "inline-block"
    } else {
        menu_active = false;
        menu_exit_area.style.display = "None";
    }
};

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


// Refactor later
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
        
        current_card.style.opacity = "0%";
        current_card.style.display = "absolute";
        setTimeout(() => {
            current_card.style.display = "None";
            current_card = cards_queue[card_index];
            
            current_card.style.opacity = "100%";
            current_card.style.display = "inline-block";
        }, 700);
    }
}

// Button scroll to form section
document.getElementById("lets-begin-btn").addEventListener("click", handleTalkWithMe)
document.getElementById("talk-withme-btn").addEventListener("click", handleTalkWithMe)

function handleTalkWithMe() {
    const target = document.getElementById("form-section");
    target.scrollIntoView({behavior: "auto", block: "start", inline:"nearest"});
}
