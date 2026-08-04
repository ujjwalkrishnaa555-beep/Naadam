// API Base URL - Change this to your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Store auth token
let authToken = localStorage.getItem('authToken') || null;
let currentUserId = localStorage.getItem('userId') || null;

// ==================== AUTH FUNCTIONS ====================

// Register User
async function registerUser(name, email, password, confirmPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    // Store token and user ID
    authToken = data.token;
    currentUserId = data.user.id;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userId', currentUserId);
    localStorage.setItem('userName', data.user.name);

    console.log('✅ Registration successful');
    return data;
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    alert('Registration failed: ' + error.message);
  }
}

// Login User
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    authToken = data.token;
    currentUserId = data.user.id;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userId', currentUserId);
    localStorage.setItem('userName', data.user.name);

    console.log('✅ Login successful');
    return data;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    alert('Login failed: ' + error.message);
  }
}

// Logout
function logoutUser() {
  authToken = null;
  currentUserId = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  console.log('✅ Logged out');
  alert('Logged out successfully');
}

// Check if user is logged in
function isLoggedIn() {
  return authToken !== null;
}

// ==================== SONGS FUNCTIONS ====================

// Get all songs
async function getAllSongs(search = '', genre = '') {
  try {
    let url = `${API_BASE_URL}/songs`;
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (genre) params.append('genre', genre);
    if (params.toString()) url += '?' + params.toString();

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error('❌ Error fetching songs:', error.message);
    return [];
  }
}

// Get trending songs
async function getTrendingSongs() {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/trending`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error fetching trending songs:', error.message);
    return [];
  }
}

// Get single song
async function getSongById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error fetching song:', error.message);
    return null;
  }
}

// Upload song
async function uploadSong(formData) {
  try {
    if (!authToken) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/songs/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Song uploaded successfully');
    return data;
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    alert('Upload failed: ' + error.message);
  }
}

// Increment play count
async function incrementPlayCount(songId) {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/${songId}/play`, {
      method: 'PATCH'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error updating play count:', error.message);
  }
}

// ==================== PLAYLIST FUNCTIONS ====================

// Get all public playlists
async function getAllPlaylists() {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error fetching playlists:', error.message);
    return [];
  }
}

// Get user playlists
async function getUserPlaylists(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/user/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error fetching user playlists:', error.message);
    return [];
  }
}

// Get single playlist
async function getPlaylistById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error fetching playlist:', error.message);
    return null;
  }
}

// Create playlist
async function createPlaylist(name, description = '', isPublic = true) {
  try {
    if (!authToken) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ name, description, isPublic })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Playlist created');
    return data.playlist;
  } catch (error) {
    console.error('❌ Error creating playlist:', error.message);
    alert('Error: ' + error.message);
  }
}

// Add song to playlist
async function addSongToPlaylist(playlistId, songId) {
  try {
    if (!authToken) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ songId })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Song added to playlist');
    return data.playlist;
  } catch (error) {
    console.error('❌ Error adding song:', error.message);
    alert('Error: ' + error.message);
  }
}

// Remove song from playlist
async function removeSongFromPlaylist(playlistId, songId) {
  try {
    if (!authToken) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ songId })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Song removed from playlist');
    return data.playlist;
  } catch (error) {
    console.error('❌ Error removing song:', error.message);
  }
}

// Delete playlist
async function deletePlaylist(playlistId) {
  try {
    if (!authToken) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Playlist deleted');
    return data;
  } catch (error) {
    console.error('❌ Error deleting playlist:', error.message);
  }
}

// ==================== FAVORITES FUNCTIONS ====================

// Add to favorites
async function addToFavorites(songId) {
  try {
    if (!authToken || !currentUserId) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/users/${currentUserId}/favorites/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ songId })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Added to favorites');
    return data;
  } catch (error) {
    console.error('❌ Error adding to favorites:', error.message);
    alert('Error: ' + error.message);
  }
}

// Remove from favorites
async function removeFromFavorites(songId) {
  try {
    if (!authToken || !currentUserId) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/users/${currentUserId}/favorites/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ songId })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Removed from favorites');
    return data;
  } catch (error) {
    console.error('❌ Error removing from favorites:', error.message);
  }
}

// Get favorite songs
async function getFavoriteSongs() {
  try {
    if (!currentUserId) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/users/${currentUserId}/favorites`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error('❌ Error fetching favorites:', error.message);
    return [];
  }
}

// ==================== USER FUNCTIONS ====================

// Get user profile
async function getUserProfile(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('❌ Error fetching user profile:', error.message);
    return null;
  }
}

// Update user profile
async function updateUserProfile(userId, name, profilePic) {
  try {
    if (!authToken) throw new Error('Please login first');

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ name, profilePic })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    console.log('✅ Profile updated');
    return data;
  } catch (error) {
    console.error('❌ Error updating profile:', error.message);
    alert('Error: ' + error.message);
  }
}

// ==================== SEARCH FUNCTIONS ====================

// Search songs and playlists
async function searchNaadam(query) {
  try {
    if (!query) throw new Error('Search query required');

    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    console.error('❌ Search error:', error.message);
    return { songs: [], playlists: [] };
  }
}

// ==================== UI HELPER FUNCTIONS ====================

// Display songs in UI
function displaySongs(songs, containerId = 'songs-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  songs.forEach(song => {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';
    songCard.innerHTML = `
      <div class="song-info">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
      <button onclick="playSongFromAPI('${song._id}', '${song.fileUrl}')" class="play-btn">▶ Play</button>
      <button onclick="addToFavorites('${song._id}')" class="fav-btn">❤ Add</button>
    `;
    container.appendChild(songCard);
  });
}

// Play song from API
function playSongFromAPI(songId, fileUrl) {
  const audio = document.getElementById('audio');
  if (audio) {
    audio.src = fileUrl;
    audio.play();
    incrementPlayCount(songId);
    console.log('🎵 Playing:', songId);
  }
}

// Initialize auth UI
function initAuthUI() {
  const authBtn = document.getElementById('auth-btn');
  if (isLoggedIn()) {
    const userName = localStorage.getItem('userName');
    if (authBtn) authBtn.innerHTML = `👤 ${userName} | <button onclick="logoutUser()">Logout</button>`;
  } else {
    if (authBtn) authBtn.innerHTML = `<button onclick="showLoginForm()">Login</button>`;
  }
}

// Show login form
function showLoginForm() {
  const email = prompt('Enter email:');
  if (!email) return;
  const password = prompt('Enter password:');
  if (password) {
    loginUser(email, password);
    initAuthUI();
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  console.log('🎵 Naadam API Integration loaded');
  initAuthUI();
});

console.log('✅ Naadam API functions loaded and ready!');
