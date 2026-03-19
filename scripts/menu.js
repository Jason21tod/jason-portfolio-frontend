
document.getElementById("nav-button").addEventListener("click", handleMenuToggle);
const menu_exit_area = document.getElementById("menu-exit-area");
menu_exit_area.addEventListener("click", handleMenuToggle);


let menu_active = false;
const menu_buttons = Array.from(document.getElementsByClassName("nav-component"));


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
