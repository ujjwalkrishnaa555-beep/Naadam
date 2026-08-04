const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

// Get search results
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const searchRegex = { $regex: q, $options: 'i' };

    const songs = await Song.find({
      $or: [
        { title: searchRegex },
        { artist: searchRegex },
        { album: searchRegex }
      ]
    }).limit(20);

    const playlists = await Playlist.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex }
      ],
      isPublic: true
    }).limit(20);

    res.json({
      songs,
      playlists
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
