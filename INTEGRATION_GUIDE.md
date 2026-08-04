# Frontend Integration Guide

## 🎵 Naadam Frontend - Backend Integration

This guide shows how to connect your Naadam frontend UI with the backend API.

## Files

- **api-integration.js** - All API functions for backend communication
- **ui-integration.js** - UI modal and page functions
- **index-integrated.html** - Updated HTML with modals and integration

## Setup

### 1. Add Scripts to Your HTML

Make sure these scripts are included in your HTML (in order):

```html
<script src="api-integration.js"></script>  <!-- API functions -->
<script src="Script.js"></script>           <!-- Original player -->
<script src="ui-integration.js"></script>   <!-- UI functions -->
```

### 2. Configure API Base URL

Open `api-integration.js` and update the API URL:

```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Change to your backend URL
```

### 3. Backend Requirements

Make sure your backend is running:

```bash
cd backend
npm install
npm run dev
```

## Features Included

### ✅ Authentication
- User registration
- User login
- Logout
- Token storage in localStorage
- Auth status display

### ✅ Music Management
- View all songs
- Search songs
- Upload new songs
- Play songs
- Track play counts

### ✅ Favorites
- Add songs to favorites
- Remove from favorites
- View favorite songs

### ✅ Playlists
- Create playlists
- View user playlists
- Add/remove songs from playlists
- Delete playlists

### ✅ Search
- Search songs by title, artist, album
- Search playlists
- Quick search in navbar

## Usage Examples

### Login
```javascript
loginUser('user@example.com', 'password123');
```

### Get Songs
```javascript
const songs = await getAllSongs();
console.log(songs);
```

### Search
```javascript
const results = await searchNaadam('Malayalam');
console.log(results.songs, results.playlists);
```

### Create Playlist
```javascript
await createPlaylist('My Favorites', 'My favorite songs', true);
```

### Add to Favorites
```javascript
await addToFavorites(songId);
```

### Upload Song
```javascript
const formData = new FormData();
formData.append('song', audioFile);
formData.append('title', 'Song Title');
formData.append('artist', 'Artist Name');
formData.append('duration', '180');
await uploadSong(formData);
```

## Modals

### Login Modal
```javascript
openLoginModal();
closeLoginModal();
```

### Register Modal
```javascript
openRegisterModal();
closeRegisterModal();
```

### Upload Modal
```javascript
openUploadModal();
closeUploadModal();
```

### Search Modal
```javascript
openSearchModal();
closeSearchModal();
```

## Local Storage

The app stores these in localStorage:

```javascript
localStorage.authToken      // JWT token
localStorage.userId         // Current user ID
localStorage.userName       // Current user name
```

## Error Handling

All API functions include error handling:

```javascript
try {
  await loginUser(email, password);
} catch (error) {
  console.error('Login failed:', error);
}
```

## Deployment

### Update API URL for Production

When deploying, change the API_BASE_URL to your production backend:

```javascript
// Development
const API_BASE_URL = 'http://localhost:5000/api';

// Production (Example: Heroku)
const API_BASE_URL = 'https://naadam-api.herokuapp.com/api';

// Or use environment-based URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';
```

## CORS Configuration

If you get CORS errors, make sure your backend has CORS enabled:

```javascript
// backend/server.js
const cors = require('cors');
app.use(cors());
```

For production, restrict CORS:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

## Testing

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Open index-integrated.html in browser

3. Test features:
   - Register new account
   - Upload a song
   - Search for songs
   - Create playlist
   - Add to favorites

## Troubleshooting

### "Cannot fetch from API"
- Check if backend is running
- Check API_BASE_URL is correct
- Check CORS is enabled
- Check firewall/network

### "Token not found"
- User needs to login first
- Check localStorage for authToken

### "File upload fails"
- Check file is audio format
- Check file size < 50MB
- Check form fields are filled

## Next Steps

1. Deploy backend (Heroku, Render, Railway)
2. Update API_BASE_URL
3. Deploy frontend (GitHub Pages, Netlify, Vercel)
4. Add more features as needed

## Support

For issues, check:
- Browser console (F12)
- Backend logs
- API endpoint responses
- Network tab in DevTools

Happy coding! 🎵
