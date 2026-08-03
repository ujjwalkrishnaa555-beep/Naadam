# Naadam
Free royalty-free music streaming website
<!DOCTYPE html>
<html lang="ml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naadam Music Player</title>
  
  <!-- CSS ഡിസൈൻ ഇവിടെ കൊടുക്കാം -->
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
    body { background-color: #121212; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .player-card { background-color: #1e1e1e; padding: 25px; border-radius: 20px; width: 340px; text-align: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
    .song-details h2 { font-size: 1.2rem; margin-bottom: 5px; }
    .song-details p { font-size: 0.9rem; color: #aaa; margin-bottom: 20px; }
    .progress-container { background: #333; border-radius: 5px; cursor: pointer; height: 6px; width: 100%; margin-bottom: 20px; }
    .progress { background-color: #ff6b00; border-radius: 5px; height: 100%; width: 0%; transition: width 0.1s linear; }
    .controls { display: flex; justify-content: center; align-items: center; margin-bottom: 25px; }
    .action-btn { background-color: #ff6b00; border: none; color: white; font-size: 1.5rem; width: 55px; height: 55px; border-radius: 50%; cursor: pointer; }
    .playlist { text-align: left; border-top: 1px solid #333; padding-top: 15px; }
    .playlist h3 { font-size: 1rem; margin-bottom: 10px; color: #ff6b00; }
    .playlist ul { list-style: none; max-height: 150px; overflow-y: auto; }
    .playlist li { padding: 10px; background: #2a2a2a; border-radius: 8px; margin-bottom: 8px; cursor: pointer; display: flex; justify-content: space-between; font-size: 0.9rem; }
    .playlist li:hover { background: #3a3a3a; }
  </style>
</head>
<body>

  <div class="player-card">
    <div class="song-details">
      <h2 id="title">Select a song</h2>
      <p id="artist">Artist Name</p>
    </div>

    <audio id="audio"></audio>

    <div class="progress-container" id="progress-container">
      <div class="progress" id="progress"></div>
    </div>

    <div class="controls">
      <button id="play" class="action-btn">▶</button>
    </div>

    <div class="playlist">
      <h3>Songs List</h3>
      <ul id="song-list"></ul>
    </div>
  </div>

  <!-- JavaScript വർക്കിംഗ് കോഡ് ഇവിടെ കൊടുക്കാം -->
  <script>
    const songs = [
      {
        title: "Kochukunjintachan",
        artist: "Malayalam Song",
        audioSrc: "YOUR_AUDIO_LINK_1.mp3"
      },
      {
        title: "Nenjukkul Peidhidhum",
        artist: "Vaaranam Aayiram",
        audioSrc: "YOUR_AUDIO_LINK_2.mp3"
      }
    ];

    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const songList = document.getElementById('song-list');

    let songIndex = 0;
    let isPlaying = false;

    loadSong(songs[songIndex]);

    function loadSong(song) {
      title.innerText = song.title;
      artist.innerText = song.artist;
      audio.src = song.audioSrc;
    }

    function playSong() {
      isPlaying = true;
      playBtn.innerText = '❚❚';
      audio.play();
    }

    function pauseSong() {
      isPlaying = false;
      playBtn.innerText = '▶';
      audio.pause();
    }

    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    });

    songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.innerText = `${song.title} - ${song.artist}`;
      li.addEventListener('click', () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
      });
      songList.appendChild(li);
    });

    audio.addEventListener('timeupdate', (e) => {
      const { duration, currentTime } = e.srcElement;
      if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
      }
    });

    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      if (duration) {
        audio.currentTime = (clickX / width) * duration;
      }
    });
  </script>
</body>
</html>

