# Naadam
Free royalty-free music streaming website
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naadam Music</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #121212; color: white; margin: 0; padding: 20px; }
    h1 { color: #ff6600; }
    .main-content { margin-top: 20px; }
    .song-card { background-color: #181818; padding: 15px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
    .play-btn { background-color: #ff6600; color: white; border: none; padding: 10px 15px; border-radius: 20px; cursor: pointer; }
    .player-bar { position: fixed; bottom: 0; left: 0; right: 0; background-color: #282828; padding: 15px; text-align: center; }
    audio { width: 100%; max-width: 400px; margin-top: 10px; }
  </style>
</head>
<body>

  <h1>Naadam Music</h1>

  <div class="main-content">
    <h2>Songs</h2>

    <div class="song-card">
      <div>
        <h3>Kochukunjintachan</h3>
        <p style="color: #b3b3b3;">Malayalam Song</p>
      </div>
      <button class="play-btn" onclick="playSong('https://ia801503.us.archive.org/15/items/kochukunjintachan/Kochukunjintachan.mp3', 'Kochukunjintachan', 'Malayalam Song')">Play</button>
    </div>

    <div class="song-card">
      <div>
        <h3>Nenjukkul Peidhidhum</h3>
        <p style="color: #b3b3b3;">Vaaranam Aayiram</p>
      </div>
      <button class="play-btn" onclick="playSong('https://ia801308.us.archive.org/10/items/NenjukkulPeidhidhum/Nenjukkul%20Peidhidhum.mp3', 'Nenjukkul Peidhidhum', 'Vaaranam Aayiram')">Play</button>
    </div>
  </div>

  <div class="player-bar">
    <div id="now-playing">Select a song to play</div>
    <audio id="audio-player" controls></audio>
  </div>

  <script>
    function playSong(url, title, artist) {
      console.log("Attempting to play: " + url); // ഇത് കൺസോൾ പരിശോധിക്കാൻ സഹായിക്കും
      const player = document.getElementById('audio-player');
      const nowPlaying = document.getElementById('now-playing');
      
      player.src = url;
      player.load(); // പാട്ട് റീലോഡ് ചെയ്യാൻ
      player.play().catch(error => {
        console.log("Playback failed:", error);
        alert("പാട്ട് പ്ലേ ആയില്ലെങ്കിൽ ദയവായി പ്ലെയറിലെ 'Play' ബട്ടൺ മാനുവലായി അമർത്തുക.");
      });
      
      nowPlaying.innerText = "Playing: " + title + " - " + artist;
    }
  </script>

</body>
</html>
