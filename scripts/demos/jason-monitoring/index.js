let checkout_field = document.getElementById("checkout");
let checkin_field = document.getElementById("checkin");
checkout_field?.addEventListener("change", () => {handleDateData(checkout_field)});
checkin_field?.addEventListener("change", () => {handleDateData(checkin_field)});


let kids_form = document.getElementById("kids_form")
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

    // Split it later
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

    console.log(inputNodes)

    inputNodes.forEach(element => {
        // console.log(element.id)
        form_data[element.id] = element.value
        element.disabled = true;
    })

    console.log(form_data)

    let url = kids_form.action
    console.log(url)
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
}

function transformInUTC(date) {   
    let formated_date =
        new String(date.getFullYear()) + '-' + 
        new String(date.getUTCMonth()) + '-' +
        new String(date.getUTCDate());
    console.log(formated_date)
    return formated_date
}

