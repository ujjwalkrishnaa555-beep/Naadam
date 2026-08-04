// Naadam Music Player
    const songs = [
  {
    title: "Vaa Senthaazhini",
    file: "songs/Vaa_Senthaazhini_Lyric_Video___Adiyae___G.V.Prakash_Kumar,_Gouri_Kishan__Justin_Prabhakaran__Vignesh(256k).mp3"
  }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const playBtn = document.querySelector(".hero button");
const cards = document.querySelectorAll(".card");
const search = document.querySelector("input");

function loadSong(index) {
    currentSong = index;
    audio.src = songs[index].file;
    title.textContent = songs[index].title;
}

playBtn.addEventListener("click", () => {
    loadSong(0);
    audio.play();
});

cards.forEach(() => {
    loadSong(0);
    audio.play();
});

function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function nextSong() {
    loadSong(0);
    audio.play();
}

function prevSong() {
    loadSong(0);
    audio.play();
}

audio.addEventListener("ended", () => {
    loadSong(0);
});

search.addEventListener("keyup", () => {
    const value = search.value.toLowerCase();

    cards.forEach(card => {
        if (card.innerText.toLowerCase().includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

loadSong(0);
