// =========================
// NAADAM - SCRIPT.JS PART 1
// =========================

// Welcome Message
console.log("🎵 Welcome to Naadam");

// Search Box
const searchInput = document.querySelector(".search-box input");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        console.log("Searching:", this.value);
    });
}

// Play Button
const playButton = document.querySelector(".play-btn");

if (playButton) {
    playButton.addEventListener("click", function () {
        alert("🎵 Music Player coming soon!");
    });
}

// Browse Button
const browseButton = document.querySelector(".browse-btn");

if (browseButton) {
    browseButton.addEventListener("click", function () {
        window.scrollTo({
            top: 650,
            behavior: "smooth"
        });
    });
}

// Music Cards
const cards = document.querySelectorAll(".music-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        card.style.transform = "scale(.97)";

        setTimeout(() => {
            card.style.transform = "";
        }, 150);

    });

});
