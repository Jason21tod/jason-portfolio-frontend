document.getElementById("lets-begin-btn").addEventListener("click", handleTalkWithMe)
document.getElementById("talk-withme-btn").addEventListener("click", handleTalkWithMe)

function handleTalkWithMe() {
    const target = document.getElementById("form-section");
    target.scrollIntoView({behavior: "auto", block: "start", inline:"nearest"});
}
