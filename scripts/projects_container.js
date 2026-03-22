if (window.innerWidth <= 520) {
    let projects_container = document.getElementById("project-section-container");
    let projects = new Array();


    updateProjectCard(projects_container.childNodes[1]);

    projects_container.addEventListener("scroll", () => {
            projects.forEach(element => {
                updateProjectCard(element);
        })
    });


    Array.from(projects_container.childNodes).forEach(element => {
        if (element.nodeName == "DIV" && !  projects.includes(element)) {
            projects.push(element);
        }
    });

    function updateProjectCard(element) {
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
}