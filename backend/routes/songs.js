const express = require('express');
const Song = require('../models/Song');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all songs with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, genre, artist } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
        { album: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre) filter.genre = genre;
    if (artist) filter.artist = artist;

    const songs = await Song.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending songs (most played)
router.get('/trending', async (req, res) => {
  try {
    const songs = await Song.find()
      .sort({ plays: -1 })
      .limit(10)
      .populate('uploadedBy', 'name email');
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

// Upload new song (authenticated users)
router.post('/upload', authMiddleware, upload.single('song'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, artist, album, genre, duration } = req.body;

    if (!title || !artist || !duration) {
      return res.status(400).json({ error: 'Title, artist, and duration are required' });
    }

    const song = new Song({
      title,
      artist,
      album,
      genre,
      duration: parseInt(duration),
      fileUrl: `/uploads/songs/${req.file.filename}`,
      uploadedBy: req.userId
    });

    await song.save();
    res.status(201).json({ message: 'Song uploaded successfully', song });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create song (for admin - direct input)
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

// Delete song (admin/owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    
    if (song.uploadedBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
