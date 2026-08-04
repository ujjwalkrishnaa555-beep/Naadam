// Naadam Music Player
const songs = [
  {
    title: "Vaa Senthaazhini",
    // Use absolute raw GitHub URL to avoid relative path issues
    file: "https://raw.githubusercontent.com/ujjwalkrishnaa555-beep/Naadam/main/songs/Vaa_Senthaazhini_Lyric_Video___Adiyae___G.V.Prakash_Kumar,_Gouri_Kishan__Justin_Prabhakaran__Vignesh(256k).mp3"
  }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const playBtn = document.getElementById("heroPlay");
const cards = document.querySelectorAll(".card");
const search = document.querySelector("input");
const progress = document.getElementById("progress");

// allow cross-origin fetching if served from raw.githubusercontent
audio.crossOrigin = "anonymous";

function loadSong(index) {
    currentSong = index;
    // encode URI to avoid issues with special characters
    audio.src = encodeURI(songs[index].file);
    console.log('Loading audio:', audio.src);
    title.textContent = songs[index].title;
    audio.load();
}

playBtn.addEventListener("click", async () => {
    // user gesture - allowed to play
    loadSong(0);
    try {
      await audio.play();
      console.log('Playback started');
    } catch (err) {
      console.error("Playback failed:", err);
      alert("Playback blocked or failed. Check console for details.");
    }
});

// attach click handlers to cards (if you add more songs, map them by index)
cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
        // if you add multiple songs later, use idx
        loadSong(0);
        audio.play().catch(err => console.error("Play error:", err));
    });
});

function playPause() {
    if (audio.paused) {
        audio.play().catch(err => console.error("Play error:", err));
    } else {
        audio.pause();
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play().catch(err => console.error("Play error:", err));
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play().catch(err => console.error("Play error:", err));
}

audio.addEventListener("ended", () => {
    nextSong();
});

audio.addEventListener("loadedmetadata", () => {
    // set progress max to duration in seconds
    if (!isNaN(audio.duration)) progress.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    // update progress value
    progress.value = Math.floor(audio.currentTime) || 0;
});

progress.addEventListener("input", () => {
    // seek
    audio.currentTime = progress.value;
});

audio.addEventListener('error', (e) => {
    const err = audio.error;
    console.error('Audio element error', err);
    // More detailed info when possible
    if (err) {
        console.error('code:', err.code, 'message:', err.message);
    }
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

// preload metadata but do not autoplay
loadSong(0);
