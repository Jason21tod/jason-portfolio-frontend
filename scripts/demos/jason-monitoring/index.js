let checkout_field = document.getElementById("checkout");
let checkin_field = document.getElementById("checkin");
checkout_field?.addEventListener("change", () => {handleDateData(checkout_field)});
checkin_field?.addEventListener("change", () => {handleDateData(checkin_field)});

let submit_warn_field = document.getElementById("error_field")
let date_warn_field = document.getElementById("warn_box");
let submit_btn = document.getElementById("submit_btn");
let kids_form = document.getElementById("kids-form");
let age_field = document.getElementById("age")
age_field?.addEventListener("change", () => {verifyAgeRange(age_field)})


let inputNodes = new Array;
let form_data = {
    "name": null,
    "age": null,
    "parent": null,
    "room": null,
    "checkin": null,
    "checkout": null,
    "anotations": null,
    "can_swim": false
}
let url = kids_form.action


kids_form.addEventListener("submit", function (event) {
    event.preventDefault();
    kids_form.childNodes.forEach(element => {
        pushInputElementsToArray(element)
    });
    inputNodes.forEach(element => {
        manipulateFormValidation(element, true, false)
    })
    sendData()
});

function sendData() {
    // We need to convert the body in Json in the moment that we're initialize
    let request_init = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
            },
        body: JSON.stringify(form_data),
    }
    fetch(url,request_init)
        .then(resp => {
            changeWarnBox(submit_warn_field, "transparent", "");
            console.log("Kid sent!")
        })
        .catch(error => {    
            changeWarnBox(submit_warn_field, "red", "Não foi possível enviar os dados, tente novamente mais tarde!");
            console.log("could not send the data!");
        })
        .finally(resp => {    
                inputNodes.forEach(element => {
                    manipulateFormValidation(element, false)
            })
        })
}

function pushInputElementsToArray(element) {
    if(element.nodeName == "LABEL") {
        element.childNodes.forEach(element => {
            if (element.nodeName == "INPUT") {
                inputNodes.push(element);
            }
        })
    };
    if(element.nodeName == "INPUT") {
        inputNodes.push(element);
    }
}

function manipulateFormValidation (element, is_disabled, clear_values= true){ 
    if (clear_values) {
        element.value = null;
    }
    else {
        form_data[element.id] = element.value;
    }
    element.disabled = is_disabled;
}

function handleDateData (target) {
    let date = new Date(target?.value);
    let formated_date = transformInUTC(date)
    form_data[target.id] = formated_date;
    let is_checkin_lower_than_checkout = form_data.checkin <= form_data.checkout;
    validateDateData(is_checkin_lower_than_checkout);
}

function validateDateData(is_checkin_lower_than_checkout) {
    if (is_checkin_lower_than_checkout) {
        changeWarnBox(date_warn_field, "trasparent", "")
        submit_btn.disabled = false;
    } else {
        changeWarnBox(date_warn_field ,"red", "O checkin precisa ser de uma data anterior ao checkout!")
        submit_btn.disabled = true;
    }
}

function changeWarnBox(element, color, text) {
    element.style.color = color;
    element.textContent = text;
}

function transformInUTC(date) {   
    let formated_date =
        new String(date.getFullYear()) + '-' + 
        new String(date.getUTCMonth()) + '-' +
        new String(date.getUTCDate());
    return new Date(formated_date)
}

function verifyAgeRange(element) {
    if (element.value < 3) {
        element.value = 3;
    }
    if (element.value > 13) {
        element.value = 13
    }
}