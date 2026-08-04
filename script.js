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

})
// =========================
// NAADAM - SCRIPT.JS PART 2
// =========================

// Mini Player
const audio = document.getElementById("audioPlayer");
const playIcon = document.querySelector(".play-icon");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

if (audio && playIcon && progress && currentTime && duration) {

    playIcon.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        playIcon.classList.replace("fa-circle-play", "fa-circle-pause");
    });

    audio.addEventListener("pause", () => {
        playIcon.classList.replace("fa-circle-pause", "fa-circle-play");
    });

    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });
}

// Highlight Active Navigation
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});

// Page Fade
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});
