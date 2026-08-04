# Naadam Music API Backend

🎵 A complete music streaming backend API built with Node.js, Express, and MongoDB.

## Features

✅ **User Authentication**
- Register & Login with JWT
- Secure password hashing with bcryptjs
- Token verification

✅ **Music Management**
- Upload songs with metadata
- Search songs by title, artist, album
- Track play counts
- View trending songs

✅ **Playlists**
- Create custom playlists
- Add/remove songs from playlists
- Public and private playlists
- Share playlists with others

✅ **User Profiles**
- User profiles with favorites
- Add/remove favorite songs
- View personal playlists
- Update profile information

✅ **Search & Discovery**
- Full-text search for songs and playlists
- Filter by genre and artist
- Trending music discovery

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/naadam
PORT=5000
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Set up MongoDB
**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Copy connection string and paste in `.env`

### 4. Create Upload Directories
```bash
mkdir -p uploads/songs
```

### 5. Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: { token, user }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer <token>

Response: { valid: true, user }
```

### Songs Endpoints

#### Get All Songs
```
GET /api/songs
GET /api/songs?search=Malayalam&genre=Folk

Response: [{ id, title, artist, ... }]
```

#### Get Trending Songs
```
GET /api/songs/trending

Response: [{ id, title, plays, ... }]
```

#### Upload Song
```
POST /api/songs/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- song: <audio file>
- title: "Song Name"
- artist: "Artist Name"
- duration: 180

Response: { message, song }
```

#### Increment Play Count
```
PATCH /api/songs/:id/play

Response: { id, title, plays: 101 }
```

### Playlists Endpoints

#### Get All Public Playlists
```
GET /api/playlists

Response: [{ id, name, owner, songs, ... }]
```

#### Get User's Playlists
```
GET /api/playlists/user/:userId

Response: [{ id, name, ... }]
```

#### Create Playlist
```
POST /api/playlists
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Favorites",
  "description": "My favorite songs",
  "isPublic": true
}

Response: { message, playlist }
```

#### Add Song to Playlist
```
POST /api/playlists/:id/songs/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "songId": "song_id_here"
}

Response: { message, playlist }
```

#### Remove Song from Playlist
```
POST /api/playlists/:id/songs/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "songId": "song_id_here"
}
```

#### Update Playlist
```
PUT /api/playlists/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "isPublic": false
}
```

#### Delete Playlist
```
DELETE /api/playlists/:id
Authorization: Bearer <token>

Response: { message: "Playlist deleted" }
```

### Users Endpoints

#### Get User Profile
```
GET /api/users/:id

Response: { id, name, email, playlists, favoritesSongs }
```

#### Update Profile
```
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "profilePic": "url_to_image"
}
```

#### Add to Favorites
```
POST /api/users/:id/favorites/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "songId": "song_id_here"
}

Response: { message, user }
```

#### Remove from Favorites
```
POST /api/users/:id/favorites/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "songId": "song_id_here"
}
```

#### Get Favorite Songs
```
GET /api/users/:id/favorites

Response: [{ id, title, artist, ... }]
```

### Search Endpoint

#### Search Songs and Playlists
```
GET /api/search?q=malayalam

Response: { songs: [...], playlists: [...] }
```

## Deployment

### Deploy to Heroku
```bash
heroku create naadam-api
git push heroku backend-setup:main
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku open
```

### Deploy to Render
1. Connect your GitHub repo to Render
2. Set root directory to `backend`
3. Add environment variables
4. Deploy

### Deploy to Railway
1. Connect your GitHub repo
2. Select backend directory
3. Add environment variables
4. Deploy

## Technology Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **File Upload**: Multer
- **API Documentation**: RESTful API

## Frontend Integration

Update your frontend to call these API endpoints. Example:

```javascript
// Register
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'User',
    email: 'user@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  })
});

// Get all songs
fetch('http://localhost:5000/api/songs')
  .then(res => res.json())
  .then(data => console.log(data));

// Play song (increment counter)
fetch(`http://localhost:5000/api/songs/${songId}/play`, {
  method: 'PATCH'
});
```

## Contributing

Feel free to fork, modify, and submit PRs!

## License

MIT License - Created by Ujjwal Krishna
