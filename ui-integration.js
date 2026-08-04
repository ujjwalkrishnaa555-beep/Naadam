// ==================== UI MODAL FUNCTIONS ====================

// Login Modal
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  loginUser(email, password);
  closeLoginModal();
  updateAuthStatus();
}

// Register Modal
function openRegisterModal() {
  document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
  document.getElementById('registerModal').style.display = 'none';
}

function handleRegister() {
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const confirmPassword = document.getElementById('registerConfirm').value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }

  registerUser(name, email, password, confirmPassword);
  closeRegisterModal();
  updateAuthStatus();
}

function switchToRegister() {
  closeLoginModal();
  openRegisterModal();
}

function switchToLogin() {
  closeRegisterModal();
  openLoginModal();
}

// Search Modal
function openSearchModal() {
  document.getElementById('searchModal').style.display = 'block';
}

function closeSearchModal() {
  document.getElementById('searchModal').style.display = 'none';
}

async function handleSearch() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert('Enter search query');
    return;
  }

  const results = await searchNaadam(query);
  displaySearchResults(results);
}

function displaySearchResults(results) {
  const container = document.getElementById('searchResults');
  container.innerHTML = '';

  if (results.songs.length > 0) {
    container.innerHTML += '<h3>🎵 Songs</h3>';
    results.songs.forEach(song => {
      container.innerHTML += `
        <div style="padding:10px; border-bottom:1px solid #333;">
          <p><strong>${song.title}</strong> by ${song.artist}</p>
          <button onclick="playSongFromAPI('${song._id}', '${song.fileUrl}')">▶ Play</button>
          <button onclick="addToFavorites('${song._id}')">❤ Add</button>
        </div>
      `;
    });
  }

  if (results.playlists.length > 0) {
    container.innerHTML += '<h3>📋 Playlists</h3>';
    results.playlists.forEach(playlist => {
      container.innerHTML += `
        <div style="padding:10px; border-bottom:1px solid #333;">
          <p><strong>${playlist.name}</strong></p>
          <p style="font-size:0.9rem; color:#aaa;">${playlist.songs.length} songs</p>
        </div>
      `;
    });
  }

  if (results.songs.length === 0 && results.playlists.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#aaa;">No results found</p>';
  }
}

// Upload Modal
function openUploadModal() {
  if (!isLoggedIn()) {
    alert('Please login first to upload songs');
    openLoginModal();
    return;
  }
  document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
  document.getElementById('uploadModal').style.display = 'none';
}

async function handleUpload() {
  const file = document.getElementById('songFile').files[0];
  const title = document.getElementById('uploadTitle').value.trim();
  const artist = document.getElementById('uploadArtist').value.trim();
  const album = document.getElementById('uploadAlbum').value.trim();
  const duration = document.getElementById('uploadDuration').value.trim();

  if (!file || !title || !artist || !duration) {
    alert('Please fill in required fields');
    return;
  }

  const formData = new FormData();
  formData.append('song', file);
  formData.append('title', title);
  formData.append('artist', artist);
  formData.append('album', album);
  formData.append('duration', duration);

  await uploadSong(formData);
  closeUploadModal();
}

// ==================== PAGE FUNCTIONS ====================

function updateAuthStatus() {
  const statusEl = document.getElementById('auth-status');
  if (isLoggedIn()) {
    const userName = localStorage.getItem('userName');
    statusEl.textContent = `👤 ${userName} (Logged In)`;
  } else {
    statusEl.textContent = 'Not logged in';
  }
}

async function showHome() {
  const songs = await getAllSongs();
  displaySongsInHome(songs);
}

function displaySongsInHome(songs) {
  const container = document.getElementById('songs-container');
  container.innerHTML = '';

  if (songs.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#aaa;">No songs available</p>';
    return;
  }

  songs.slice(0, 6).forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="margin-bottom:10px;">
        <h4>${song.title}</h4>
        <p style="font-size:0.9rem; color:#aaa;">${song.artist}</p>
      </div>
      <button onclick="playSongFromAPI('${song._id}', '${song.fileUrl}')" style="width:100%; margin-bottom:5px;">▶ Play</button>
      <button onclick="addToFavorites('${song._id}')" style="width:100%;">❤ Favorite</button>
    `;
    container.appendChild(card);
  });
}

async function showFavorites() {
  if (!isLoggedIn()) {
    alert('Please login to view favorites');
    return;
  }

  const favorites = await getFavoriteSongs();
  const container = document.getElementById('songs-container');
  container.innerHTML = '<h2>❤️ Your Favorites</h2>';

  if (favorites.length === 0) {
    container.innerHTML += '<p style="color:#aaa;">No favorites yet</p>';
    return;
  }

  favorites.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="margin-bottom:10px;">
        <h4>${song.title}</h4>
        <p style="font-size:0.9rem; color:#aaa;">${song.artist}</p>
      </div>
      <button onclick="playSongFromAPI('${song._id}', '${song.fileUrl}')">▶ Play</button>
    `;
    container.appendChild(card);
  });
}

async function showUserPlaylists() {
  if (!isLoggedIn()) {
    alert('Please login to view playlists');
    return;
  }

  const playlists = await getUserPlaylists(currentUserId);
  const container = document.getElementById('songs-container');
  container.innerHTML = '<h2>🎶 Your Playlists</h2>';
  container.innerHTML += '<button onclick="createNewPlaylist()" style="margin-bottom:20px; padding:10px 20px; background:#ff7a00; color:white; border:none; border-radius:8px; cursor:pointer;">+ Create Playlist</button>';

  if (playlists.length === 0) {
    container.innerHTML += '<p style="color:#aaa;">No playlists yet</p>';
    return;
  }

  playlists.forEach(playlist => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${playlist.name}</h4>
      <p style="font-size:0.9rem; color:#aaa;">${playlist.songs.length} songs</p>
      <button onclick="viewPlaylist('${playlist._id}')">View</button>
    `;
    container.appendChild(card);
  });
}

function createNewPlaylist() {
  const name = prompt('Playlist name:');
  if (!name) return;
  const description = prompt('Description (optional):');
  const isPublic = confirm('Make public?');

  createPlaylist(name, description || '', isPublic);
  showUserPlaylists();
}

async function viewPlaylist(playlistId) {
  const playlist = await getPlaylistById(playlistId);
  const container = document.getElementById('songs-container');
  container.innerHTML = `<h2>${playlist.name}</h2>`;
  container.innerHTML += `<p>${playlist.description}</p>`;

  if (playlist.songs.length === 0) {
    container.innerHTML += '<p style="color:#aaa;">No songs in this playlist</p>';
    return;
  }

  playlist.songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${song.title}</h4>
      <p style="font-size:0.9rem; color:#aaa;">${song.artist}</p>
      <button onclick="playSongFromAPI('${song._id}', '${song.fileUrl}')">▶ Play</button>
    `;
    container.appendChild(card);
  });
}

async function handleQuickSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) {
    showHome();
    return;
  }

  const results = await searchNaadam(query);
  const container = document.getElementById('songs-container');
  container.innerHTML = '';

  results.songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${song.title}</h4>
      <p style="font-size:0.9rem; color:#aaa;">${song.artist}</p>
      <button onclick="playSongFromAPI('${song._id}', '${song.fileUrl}')">▶ Play</button>
    `;
    container.appendChild(card);
  });
}

async function playRandomSong() {
  const songs = await getAllSongs();
  if (songs.length > 0) {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    playSongFromAPI(randomSong._id, randomSong.fileUrl);
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  updateAuthStatus();
  showHome();
});

console.log('✅ UI Integration loaded');
