# Naadam Music API Backend

This is the backend API for the Naadam music streaming application.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```
MONGODB_URI=mongodb://localhost:27017/naadam
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run the Server
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song by ID
- `POST /api/songs` - Create new song
- `PATCH /api/songs/:id/play` - Increment play count

### Playlists
- `GET /api/playlists` - Get all playlists
- `POST /api/playlists` - Create playlist
- `POST /api/playlists/:id/songs` - Add song to playlist

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/favorites` - Add song to favorites

## Technology Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
