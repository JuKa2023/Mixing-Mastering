document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const section = document.getElementsByClassName("navdropdown")[0];

    burgerMenu.addEventListener("click", () => {
        if (section.classList.contains("active")) {
            section.classList.remove("active");
            section.style.maxHeight = "0";
            section.style.padding = "0 10px"; // Adjust padding to keep horizontal padding
        } else {
            section.classList.add("active");
            section.style.maxHeight = section.scrollHeight + "px";
            section.style.padding = "10px";
        }
    });

    window.addEventListener("resize", () => {
        if (section.classList.contains("active")) {
            section.classList.remove("active");
            section.style.maxHeight = "0";
            section.style.padding = "0 10px"; // Adjust padding to keep horizontal padding
        }
    });
});
