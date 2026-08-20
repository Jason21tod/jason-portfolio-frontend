let checkout_field = document.getElementById("checkout");
let checkin_field = document.getElementById("checkin");
checkout_field?.addEventListener("change", () => {handleDateData(checkout_field)});
checkin_field?.addEventListener("change", () => {handleDateData(checkin_field)});


// TODO -> Split the functions
// TODO -> Format the date correctly and compare if they're correct

let kids_form = document.getElementById("kids-form")
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


kids_form.addEventListener("submit", function (event) {
    event.preventDefault();

    kids_form.childNodes.forEach(element => {
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
    });

    inputNodes.forEach(element => {
        form_data[element.id] = element.value
        element.disabled = true;
    })


    let url = kids_form.action
    response = fetch(
        url,{
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                },
            body: JSON.stringify(form_data),
        }).then(resp => {
            if (resp.status == 200) {
                    inputNodes.forEach(element => {
                        element.value = null
                        element.disabled = false;
                })
            }
            console.log("Kid sent!")
    })
})

function handleDateData (target) {
    let date = new Date(target?.value);
    let formated_date = transformInUTC(date)
    form_data[target.id] = formated_date
}

function transformInUTC(date) {   
    let formated_date =
        new String(date.getFullYear()) + '-' + 
        new String(date.getUTCMonth()) + '-' +
        new String(date.getUTCDate());
    console.log(formated_date)
    return formated_date
}

