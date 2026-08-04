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
// =========================
// NAADAM - SCRIPT.JS PART 2
// =========================

// Mini Player Controls

const playIcon = document.querySelector(".play-icon");
let isPlaying = false;

if (playIcon) {
    playIcon.addEventListener("click", () => {

        if (!isPlaying) {
            playIcon.classList.remove("fa-circle-play");
            playIcon.classList.add("fa-circle-pause");
            isPlaying = true;
        } else {
            playIcon.classList.remove("fa-circle-pause");
            playIcon.classList.add("fa-circle-play");
            isPlaying = false;
        }

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

// Simple Fade Animation

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

const audio = document.getElementById("audioPlayer");

if (playIcon && audio) {
    playIcon.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
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
    });
}
const progress = document.getElementById("progress");

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("loadedmetadata", () => {
    document.getElementById("duration").textContent =
        formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    document.getElementById("currentTime").textContent =
        formatTime(audio.currentTime);
});
