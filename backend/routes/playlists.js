const express = require('express');
const Playlist = require('../models/Playlist');
const router = express.Router();

// Get all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find()
      .populate('owner', 'name')
      .populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create playlist
router.post('/', async (req, res) => {
  try {
    const { name, description, owner } = req.body;

    if (!name || !owner) {
      return res.status(400).json({ error: 'Name and owner required' });
    }

    const playlist = new Playlist({
      name,
      description,
      owner
    });

    await playlist.save();
    res.status(201).json({ message: 'Playlist created', playlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add song to playlist
router.post('/:id/songs', async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $push: { songs: songId } },
      { new: true }
    ).populate('songs');
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
