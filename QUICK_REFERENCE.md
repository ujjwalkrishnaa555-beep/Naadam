# Naadam Music App - Quick Reference Guide

## 🎯 Essential Links

| Resource | Location |
|----------|----------|
| **Setup Guide** | `INTEGRATION_GUIDE.md` |
| **Deployment** | `DEPLOYMENT_GUIDE.md` |
| **Database** | `MONGODB_GUIDE.md` |
| **Post-Deploy** | `GETTING_STARTED_LIVE.md` |
| **GitHub Workflows** | `GITHUB_ACTIONS.md` |

## ⚡ Quick Commands

### Start Backend
```bash
cd backend
npm install
npm run dev
```

### Test API
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/songs
```

### Deploy to Heroku
```bash
heroku login
heroku create naadam-api
heroku config:set MONGODB_URI="..."
git push heroku main
```

## 📋 Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Database cluster setup
- [ ] Connection string copied
- [ ] Heroku/Render account created
- [ ] Environment variables set
- [ ] Backend deployed
- [ ] Frontend API_BASE_URL updated
- [ ] Frontend deployed
- [ ] Test register/login
- [ ] Test upload
- [ ] Test search
- [ ] Test playlist
- [ ] Share URL!

## 🔑 Important Files

- `backend/server.js` - Main server
- `backend/models/` - Database schemas
- `backend/routes/` - API endpoints
- `api-integration.js` - Frontend API calls
- `ui-integration.js` - Frontend UI logic
- `index-integrated.html` - Main HTML file

## 🌐 Environment Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
PORT=5000
API_BASE_URL=https://backend-url/api
```

## 📞 Quick Support

| Issue | Solution |
|-------|----------|
| API not working | Check `API_BASE_URL` in `api-integration.js` |
| Upload fails | Check file size < 50MB and format |
| Login fails | Verify MongoDB connection |
| CORS errors | Check backend has `cors()` enabled |
| Slow app | Check MongoDB indexes |

## 🎵 Feature Overview

✅ User Auth (Register/Login)
✅ Upload Songs
✅ Search Music
✅ Playlists
✅ Favorites
✅ Music Player
✅ Trending Songs
✅ User Profiles

## 📈 Performance Tips

1. Use MongoDB indexes
2. Implement pagination
3. Cache frequently accessed data
4. Compress static files
5. Use CDN for audio files
6. Monitor database queries

## 🚀 Next Steps

1. **Deploy Now** → Follow `DEPLOYMENT_GUIDE.md`
2. **Test Locally** → `npm run dev` then open `index-integrated.html`
3. **Customize** → Change colors, logo, app name
4. **Add Features** → Implement recommendations, social features
5. **Share** → Tell friends about your app!

---

**Your Naadam app is ready!** 🎵🚀
