# MongoDB Setup & Backup Guide

## 🗄️ MongoDB Atlas Setup

### Create Free Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create new project
4. Create a cluster (Free M0 tier)
5. Wait for cluster to initialize (10-15 minutes)

### Create Database User
1. Go to Database Access
2. Click "Add New Database User"
3. Username: `naadam_user`
4. Password: Generate strong password
5. Database User Privileges: Read and write to any database
6. Click "Add User"

### Configure Network Access
1. Go to Network Access
2. Click "Add IP Address"
3. For development: Add your IP
4. For production: Allow 0.0.0.0/0 (anywhere)
5. Add description: "Naadam App"

### Get Connection String
1. Go to Clusters
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<username>` and `<password>`

Example:
```
mongodb+srv://naadam_user:MyPassword123@cluster0.mongodb.net/naadam?retryWrites=true&w=majority
```

## 📊 Database Optimization

### Create Indexes
```javascript
// songs collection
db.songs.createIndex({ title: "text", artist: "text" })
db.songs.createIndex({ artist: 1 })
db.songs.createIndex({ genre: 1 })

// users collection
db.users.createIndex({ email: 1 }, { unique: true })

// playlists collection
db.playlists.createIndex({ owner: 1 })
db.playlists.createIndex({ isPublic: 1 })
```

### Monitor Performance
1. Go to Metrics in MongoDB Atlas
2. Check:
   - Database operations
   - Network I/O
   - Storage usage
   - Connection count

## 🔐 Backup Strategy

### Automatic Backups
1. Go to Backup in MongoDB Atlas
2. Enable "Automatic Backup"
3. Set retention: 7-30 days
4. Backup frequency: Daily

### Manual Backup
```bash
# Export database
mongodump --uri "mongodb+srv://naadam_user:password@cluster.mongodb.net/naadam" --out ./backup

# Import database
mongorestore --uri "mongodb+srv://naadam_user:password@cluster.mongodb.net/naadam" ./backup
```

### Backup Locations
- **Development**: Local backup
- **Production**: MongoDB Atlas + External backup

## 🚨 Troubleshooting

### Connection timeout
- Check IP whitelist
- Verify credentials
- Check MongoDB status

### Authentication failed
- Verify username and password
- Check special characters in password
- Reset password if needed

### Slow queries
- Add indexes
- Check query patterns
- Monitor in Metrics

## 📈 Scaling

### When to upgrade
- Storage > 400MB (M0 limit)
- Need more performance
- High number of users

### Upgrade path
1. M0 (Free) → M2 ($9/month)
2. M2 → M5 ($57/month)
3. M10 → M30 (Enterprise)

## 💾 Migration

### Backup before migration
```bash
mongodump --uri "old_connection_string" --out ./backup
```

### Restore to new database
```bash
mongorestore --uri "new_connection_string" ./backup
```

### Verify data
```bash
db.songs.countDocuments()
db.users.countDocuments()
db.playlists.countDocuments()
```
