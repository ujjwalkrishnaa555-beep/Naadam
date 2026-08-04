const express = require('express');
const Playlist = require('../models/Playlist');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all public playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find({ isPublic: true })
      .populate('owner', 'name')
      .populate('songs')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's playlists
router.get('/user/:userId', async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.params.userId })
      .populate('owner', 'name')
      .populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single playlist
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('owner', 'name')
      .populate('songs');
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create playlist (authenticated)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Playlist name required' });
    }

    const playlist = new Playlist({
      name,
      description: description || '',
      owner: req.userId,
      isPublic: isPublic !== undefined ? isPublic : true
    });

    await playlist.save();
    res.status(201).json({ message: 'Playlist created', playlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add song to playlist
router.post('/:id/songs/add', authMiddleware, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (playlist.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { songs: songId } },
      { new: true }
    ).populate('songs');
    
    res.json({ message: 'Song added', playlist: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove song from playlist
router.post('/:id/songs/remove', authMiddleware, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (playlist.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $pull: { songs: songId } },
      { new: true }
    ).populate('songs');
    
    res.json({ message: 'Song removed', playlist: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update playlist
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (playlist.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { name, description, isPublic } = req.body;
    const updated = await Playlist.findByIdAndUpdate(
      req.params.id,
      { name, description, isPublic },
      { new: true }
    );
    
    res.json({ message: 'Playlist updated', playlist: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete playlist
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (playlist.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
