# 🎵 Naadam Music Streaming App - Complete Documentation

## 🚀 Project Overview

**Naadam** is a full-stack music streaming application inspired by Spotify and JioSaavn, featuring:
- 🎶 Music upload and streaming
- 👤 User authentication & profiles
- ❤️ Favorites system
- 📋 Playlist management
- 🔍 Advanced search
- 🎨 Beautiful UI with modern design

---

## 📁 Project Structure

```
Naadam/
├── frontend/
│   ├── index-integrated.html      # Main UI with modals
│   ├── style.css                   # Styling
│   ├── Script.js                   # Music player logic
│   ├── api-integration.js          # Backend API functions
│   ├── ui-integration.js           # UI interactions
│   └── logo.svg                    # App logo
├── backend/
│   ├── server.js                   # Express server
│   ├── package.json                # Dependencies
│   ├── Procfile                    # Heroku deployment
│   ├── models/
│   │   ├── User.js
│   │   ├── Song.js
│   │   └── Playlist.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── songs.js
│   │   ├── playlists.js
│   │   ├── users.js
│   │   └── search.js
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   └── upload.js               # File upload handling
│   └── .env.example                # Environment template
├── DEPLOYMENT_GUIDE.md             # Deployment instructions
├── MONGODB_GUIDE.md                # Database setup
├── INTEGRATION_GUIDE.md            # Frontend-backend integration
├── GITHUB_ACTIONS.md               # CI/CD workflows
├── GETTING_STARTED_LIVE.md         # Post-deployment guide
└── README.md                       # This file
```

---

## 🎯 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive design
- **JavaScript (ES6+)** - Interactive UI
- **Fetch API** - API communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Document Mapper)
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

### Deployment
- **Heroku / Render / Railway** - Backend hosting
- **Vercel / Netlify** - Frontend hosting
- **MongoDB Atlas** - Cloud database
- **GitHub Actions** - CI/CD automation

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas account
- Git

### Setup Backend
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
echo "MONGODB_URI=mongodb://localhost:27017/naadam" >> .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "PORT=5000" >> .env

# Start backend
npm run dev
```

### Setup Frontend
```bash
# Open index-integrated.html in browser
# Or use a local server
python -m http.server 3000
# Visit http://localhost:3000/index-integrated.html
```

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url/api`

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Body: { name, email, password, confirmPassword }
Response: { token, user }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

#### Verify Token
```
GET /api/auth/verify
Headers: { Authorization: "Bearer <token>" }
Response: { valid, user }
```

### Songs Endpoints

#### Get All Songs
```
GET /api/songs
Query: ?search=query&genre=folk&artist=name
Response: [{ id, title, artist, ... }]
```

#### Upload Song
```
POST /api/songs/upload
Headers: { Authorization: "Bearer <token>" }
Body: FormData { song, title, artist, duration }
Response: { song }
```

#### Get Trending
```
GET /api/songs/trending
Response: [{ songs sorted by plays }]
```

### Playlists Endpoints

#### Get All Playlists
```
GET /api/playlists
Response: [{ id, name, owner, songs }]
```

#### Create Playlist
```
POST /api/playlists
Headers: { Authorization: "Bearer <token>" }
Body: { name, description, isPublic }
Response: { playlist }
```

#### Add Song to Playlist
```
POST /api/playlists/:id/songs/add
Headers: { Authorization: "Bearer <token>" }
Body: { songId }
Response: { playlist }
```

### Users Endpoints

#### Get Profile
```
GET /api/users/:id
Response: { user, playlists, favoritesSongs }
```

#### Add to Favorites
```
POST /api/users/:id/favorites/add
Headers: { Authorization: "Bearer <token>" }
Body: { songId }
Response: { user }
```

### Search Endpoint

#### Search
```
GET /api/search?q=query
Response: { songs: [...], playlists: [...] }
```

---

## 🔐 Authentication

### JWT Tokens
- Tokens stored in `localStorage`
- Auto-included in requests via `Authorization: Bearer <token>`
- Expires in 7 days
- Used for:
  - User identification
  - Permission verification
  - Session management

### Password Security
- Hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Validated on registration & login
- Minimum 6 characters

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePic: String,
  favoritesSongs: [Song._id],
  playlists: [Playlist._id],
  createdAt: Date
}
```

### Song Schema
```javascript
{
  title: String (required),
  artist: String (required),
  album: String,
  genre: String,
  duration: Number (seconds),
  fileUrl: String (required),
  coverImage: String,
  uploadedBy: User._id,
  plays: Number (default: 0),
  createdAt: Date
}
```

### Playlist Schema
```javascript
{
  name: String (required),
  description: String,
  owner: User._id (required),
  songs: [Song._id],
  coverImage: String,
  isPublic: Boolean (default: true),
  createdAt: Date
}
```

---

## 🚀 Deployment

### Quick Deploy to Heroku
```bash
heroku login
cd backend
heroku create naadam-api
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_secret"
git push heroku main
heroku open
```

### Deploy to Render
1. Go to https://render.com
2. Connect GitHub repo
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

### Deploy Frontend to Vercel
1. Update `API_BASE_URL` in `api-integration.js`
2. Go to https://vercel.com
3. Import GitHub repo
4. Deploy

**For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

---

## 📊 Features

### ✅ Implemented
- User registration & authentication
- Song upload & streaming
- Music player with controls
- Playlist creation & management
- Favorites system
- Full-text search
- Trending songs
- User profiles
- Play count tracking
- Responsive design

### 🔄 Potential Enhancements
- Social features (follow, share)
- Recommendations engine
- Comments & ratings
- Offline mode
- Mobile app
- Advanced analytics
- Podcast support
- Radio stations
- Collaborations

---

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ MongoDB injection prevention
- ✅ Environment variables for secrets
- ✅ HTTPS ready
- ✅ Rate limiting ready

---

## 📈 Performance

### Optimizations
- MongoDB indexes on frequently queried fields
- Pagination support for large datasets
- File upload size limits (50MB)
- Async/await for non-blocking operations
- CORS caching headers
- Static file compression

### Monitoring
- Backend logs in deployment platform
- MongoDB Atlas metrics
- Frontend error tracking
- Performance monitoring available

---

## 🧪 Testing

### Manual Testing
1. Register new account
2. Login/Logout
3. Upload song
4. Search songs
5. Create playlist
6. Add to favorites
7. Play music
8. Edit profile

### API Testing (using curl)
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@test.com","password":"pass123","confirmPassword":"pass123"}'

# Get songs
curl http://localhost:5000/api/songs

# Search
curl "http://localhost:5000/api/search?q=malayalam"
```

---

## 📝 Configuration

### Environment Variables
```env
# Server
NODE_ENV=development|production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/naadam

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### Frontend Configuration
```javascript
// api-integration.js
const API_BASE_URL = 'http://localhost:5000/api'; // Change for production
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version  # Should be v14+

# Check MongoDB connection
# Verify MONGODB_URI is correct

# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### CORS errors
- Ensure `cors()` is enabled in server.js
- Check frontend API_BASE_URL
- Verify backend URL format

### Upload fails
- Check file size (< 50MB)
- Verify file format (MP3, WAV, OGG)
- Ensure user is logged in
- Check uploads directory exists

### Database connection failed
- Verify MongoDB is running
- Check MONGODB_URI syntax
- Add your IP to MongoDB whitelist
- Verify username/password

---

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)
- [Web Security](https://owasp.org/)

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Author

**Ujjwal Krishna**
- Email: ujjwalkrishna0555@gmail.com
- Phone: +91 85909 21747
- GitHub: [@ujjwalkrishnaa555-beep](https://github.com/ujjwalkrishnaa555-beep)

---

## 🙏 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📞 Support

If you encounter issues:
1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Review [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
3. Check backend logs
4. Look at browser console (F12)
5. Search GitHub Issues
6. Create a new issue with details

---

## 🎉 Getting Started

### For Local Development
1. Clone repository
2. Install backend dependencies: `npm install` in `/backend`
3. Create `.env` file with MongoDB URI
4. Run `npm run dev` to start backend
5. Open `index-integrated.html` in browser

### For Deployment
1. Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Set up MongoDB Atlas
3. Deploy backend (Heroku/Render/Railway)
4. Update API_BASE_URL
5. Deploy frontend (Vercel/Netlify)
6. Test all features
7. Share with friends!

---

## 🚀 Your Journey Starts Here!

Your Naadam music streaming app is now complete and ready to deploy!

Choose your deployment platform, follow the guides, and share your creation with the world. 🎵

**Happy coding!** 💻✨
