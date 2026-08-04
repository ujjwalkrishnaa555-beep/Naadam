const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().populate('uploadedBy', 'name email');
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('uploadedBy');
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create song (for admin)
router.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre, duration, fileUrl, coverImage } = req.body;

    if (!title || !artist || !duration || !fileUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const song = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      fileUrl,
      coverImage
    });

    await song.save();
    res.status(201).json({ message: 'Song created', song });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update play count
router.patch('/:id/play', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } },
      { new: true }
    );
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
