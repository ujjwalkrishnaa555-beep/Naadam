// Elements

const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");

const playerBtn = document.getElementById("player-btn");
const playerScreen = document.querySelector(".player-screen");
const closePlayer = document.getElementById("close-player");


// Open Side Menu

menuBtn.addEventListener("click", () => {

    sideMenu.classList.add("active");
    overlay.classList.add("active");

});


// Close Side Menu

overlay.addEventListener("click", () => {

    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

    playerScreen.classList.remove("active");

});


// Open Full Player

playerBtn.addEventListener("click", () => {

    playerScreen.classList.add("active");

});


// Close Full Player

closePlayer.addEventListener("click", () => {

    playerScreen.classList.remove("active");

});


// Bottom Navigation Active Change

const navLinks = document.querySelectorAll(".bottom-nav a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});
