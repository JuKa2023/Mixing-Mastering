document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const section = document.querySelector("section");

    burgerMenu.addEventListener("click", () => {
        section.classList.toggle("active");
    });
});
