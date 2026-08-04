// Naadam Music Player

const songs = [
  {
    title: "Backwater Beats",
    file: "songs/backwater-beats.mp3"
  },
  {
    title: "Monsoon Memories",
    file: "songs/monsoon-memories.mp3"
  },
  {
    title: "Kerala Folk",
    file: "songs/kerala-folk.mp3"
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

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        loadSong(index);
        audio.play();
    });
});

function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

audio.addEventListener("ended", nextSong);

// Live Search
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
