const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('favoritesSongs')
      .populate('playlists');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile (authenticated)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { name, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, profilePic },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add song to favorites
router.post('/:id/favorites/add', authMiddleware, async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { favoritesSongs: songId } },
      { new: true }
    ).populate('favoritesSongs');
    res.json({ message: 'Added to favorites', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from favorites
router.post('/:id/favorites/remove', authMiddleware, async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { favoritesSongs: songId } },
      { new: true }
    ).populate('favoritesSongs');
    res.json({ message: 'Removed from favorites', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's favorite songs
router.get('/:id/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('favoritesSongs');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.favoritesSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
