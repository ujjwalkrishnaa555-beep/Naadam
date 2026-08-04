// Naadam Music Player - improved robustness
const songs = [
  {
    title: "Vaa Senthaazhini",
    // absolute raw URL to the mp3 in this repo
    file: "https://raw.githubusercontent.com/ujjwalkrishnaa555-beep/Naadam/main/songs/Vaa_Senthaazhini_Lyric_Video___Adiyae___G.V.Prakash_Kumar,_Gouri_Kishan__Justin_Prabhakaran__Vignesh(256k).mp3"
  }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
let playBtn = document.getElementById("heroPlay") || document.querySelector(".hero button");
const cards = document.querySelectorAll(".card");
const search = document.querySelector("input");
const progress = document.getElementById("progress");

// If play button is missing, create a visible one so user can gesture
if (!playBtn) {
  const hero = document.querySelector('.hero') || document.body;
  const b = document.createElement('button');
  b.id = 'heroPlay';
  b.textContent = '▶ Play Now';
  b.style.marginTop = '10px';
  hero.appendChild(b);
  playBtn = b;
}

// allow cross-origin fetching if served from raw.githubusercontent
if (audio) {
  audio.crossOrigin = "anonymous";
  audio.controls = true; // show native controls as fallback
  audio.preload = 'metadata';
}

function log(...args) { try { console.log('[player]', ...args); } catch(e){} }

function loadSong(index) {
    currentSong = index;
    const src = songs[index].file;
    // encode URI to avoid issues with special characters
    audio.src = encodeURI(src);
    log('Loading audio:', audio.src);
    title.textContent = songs[index].title;
    audio.load();
}

playBtn.addEventListener("click", async (ev) => {
    ev.preventDefault();
    // user gesture - allowed to play
    if (!audio.src || audio.src === '') loadSong(currentSong);
    try {
      await audio.play();
      log('Playback started');
      playBtn.textContent = '⏸ Pause';
    } catch (err) {
      console.error("Playback failed:", err);
      alert("Playback blocked or failed. Check console for details.");
    }
});

// Also toggle button text on pause/play
audio.addEventListener('play', () => { playBtn.textContent = '⏸ Pause'; });
audio.addEventListener('pause', () => { playBtn.textContent = '▶ Play Now'; });

// attach click handlers to cards (if you add more songs, map them by index)
cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
        // if you add multiple songs later, use idx
        loadSong(0);
        audio.play().catch(err => console.error("Play error:", err));
    });
});

function playPause() {
    if (!audio) return;
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
    if (progress && !isNaN(audio.duration)) progress.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    // update progress value
    if (progress) progress.value = Math.floor(audio.currentTime) || 0;
});

if (progress) progress.addEventListener("input", () => {
    // seek
    audio.currentTime = progress.value;
});

audio.addEventListener('error', (e) => {
    const err = audio.error;
    console.error('Audio element error', err);
    if (err) {
        console.error('code:', err.code, 'message:', err.message);
        alert('Audio load error code: ' + err.code + '. See console for details.');
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
