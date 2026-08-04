# Naadam Music App - Complete Deployment Guide

## 🚀 Deployment Options

Choose one of the following deployment platforms:

1. **Heroku** - Easy, beginner-friendly
2. **Render** - Modern, free tier available
3. **Railway** - Simple with GitHub integration
4. **Vercel** (Frontend only) - Fast, reliable
5. **Netlify** (Frontend only) - Easy drag-and-drop

---

## 📊 Option 1: Deploy Backend to Heroku

### Prerequisites
- Heroku account (free at https://heroku.com)
- Heroku CLI installed
- GitHub repository with code

### Step 1: Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 2: Login to Heroku
```bash
heroku login
# Opens browser for authentication
```

### Step 3: Create Heroku App
```bash
cd backend
heroku create naadam-api
# Or with custom name
heroku create your-unique-name
```

### Step 4: Set Environment Variables
```bash
# MongoDB Atlas connection string
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/naadam"
heroku config:set JWT_SECRET="your_super_secret_key"
heroku config:set JWT_EXPIRE="7d"
heroku config:set NODE_ENV="production"
```

### Step 5: Add Procfile
Create `backend/Procfile` (no extension):
```
web: node server.js
```

### Step 6: Deploy
```bash
git push heroku backend-setup:main
# Or for main branch
git push heroku main
```

### Step 7: Check Logs
```bash
heroku logs --tail
# Visit your app
heroku open
```

### Your Backend URL
```
https://your-app-name.herokuapp.com
```

---

## 🎨 Option 2: Deploy Backend to Render

### Prerequisites
- Render account (free at https://render.com)
- GitHub repository
- MongoDB connection string

### Step 1: Create New Web Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select `backend` as root directory

### Step 2: Configure Service
- **Name**: naadam-api
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### Step 3: Add Environment Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/naadam
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
PORT=10000
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment
- Your URL will be displayed

### Your Backend URL
```
https://naadam-api.onrender.com
```

---

## 🚂 Option 3: Deploy Backend to Railway

### Prerequisites
- Railway account (free at https://railway.app)
- GitHub repository
- MongoDB connection string

### Step 1: Create New Project
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your repository

### Step 2: Configure
- Select GitHub repo
- Select `backend` folder
- Click "Deploy"

### Step 3: Add Environment Variables
1. Go to Variables tab
2. Add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/naadam
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
PORT=${{PORT}}
```

### Step 4: Get URL
- Domain will be auto-generated
- Copy from Railway dashboard

### Your Backend URL
```
https://naadam-api-production-xxxx.railway.app
```

---

## 🗄️ Step 4: Setup MongoDB Atlas (Database)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email

### Step 2: Create Cluster
1. Click "Create a Deployment"
2. Choose "Free" tier (M0)
3. Select your region (closest to you)
4. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `naadam-user`
4. Password: (auto-generated or create)
5. Click "Add User"

### Step 4: Allow Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for testing)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string:
```
mongodb+srv://naadam-user:PASSWORD@cluster.mongodb.net/naadam?retryWrites=true&w=majority
```

5. Replace `PASSWORD` with your actual password
6. Use this as `MONGODB_URI`

---

## 🌐 Option 4: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub repository
- Backend URL from above

### Step 1: Update API URL
Update `api-integration.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url/api';
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy"

### Step 3: Set Environment Variables (Optional)
1. Go to Settings → Environment Variables
2. Add: `REACT_APP_API_URL=https://your-backend-url/api`

### Your Frontend URL
```
https://naadam-music.vercel.app
```

---

## 📱 Option 5: Deploy Frontend to Netlify

### Step 1: Update API URL
Update `api-integration.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url/api';
```

### Step 2: Deploy
1. Go to https://netlify.com
2. Drag and drop your `index-integrated.html` and all files
3. Or connect GitHub repo

### Step 3: Configure
- Set build command: (none needed for static site)
- Set publish directory: `.` (current directory)

### Your Frontend URL
```
https://naadam-music.netlify.app
```

---

## ✅ Testing After Deployment

### 1. Test Backend
```bash
curl https://your-backend-url/health
# Should return: { "status": "Server is healthy" }
```

### 2. Test API Endpoints
```bash
# Get songs
curl https://your-backend-url/api/songs

# Register user
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 3. Test Frontend
- Open your frontend URL
- Try to register
- Login
- Upload a song
- Create a playlist

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check logs
heroku logs --tail          # Heroku
# Or in Render/Railway dashboard

# Check if all dependencies installed
cd backend && npm install

# Check MongoDB connection
# Verify MONGODB_URI is correct
```

### CORS errors
```javascript
// Make sure CORS is enabled in server.js
const cors = require('cors');
app.use(cors());
```

### Frontend can't reach backend
```javascript
// Update API_BASE_URL in api-integration.js
const API_BASE_URL = 'https://your-deployed-backend-url/api';
```

### MongoDB connection timeout
1. Check MongoDB Atlas IP whitelist
2. Add your deployment IP to whitelist
3. Or allow access from anywhere (0.0.0.0/0)

---

## 📊 Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| Heroku | Free/Paid | Free tier available |
| Render | Free | Free tier with limits |
| Railway | Free/Paid | Pay-as-you-go |
| MongoDB Atlas | Free | Free tier (512MB) |
| Vercel | Free | Free for static sites |
| Netlify | Free | Free for static sites |

---

## 🎯 Recommended Setup

**For Beginners:**
1. Backend: Render (free, easy setup)
2. Database: MongoDB Atlas (free, 512MB)
3. Frontend: Vercel (free, fast)

**For Production:**
1. Backend: Railway or Heroku (paid)
2. Database: MongoDB Atlas (paid tier)
3. Frontend: Vercel or Netlify (paid)

---

## 📝 Quick Deployment Checklist

- [ ] Create Heroku/Render/Railway account
- [ ] Create MongoDB Atlas account
- [ ] Update API_BASE_URL in frontend
- [ ] Add environment variables to backend
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Test all features
- [ ] Add custom domain (optional)
- [ ] Set up auto-deployment (optional)

---

## 🎓 Next Steps

1. Choose a deployment platform
2. Follow the steps above
3. Test your deployed app
4. Share your URL with friends
5. Keep improving features!

**Your Naadam music app is ready to go live! 🎵**
