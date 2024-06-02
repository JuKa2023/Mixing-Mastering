document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const section = document.getElementById("mobileNavDropdown");

    burgerMenu.addEventListener("click", () => {
        if (section.classList.contains("active")) {
            section.classList.remove("active");
        } else {
            section.classList.add("active");
        }
    });

    window.addEventListener("resize", () => {
        if (section.classList.contains("active")) {
            section.classList.remove("active");
        }
    });
});
