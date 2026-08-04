const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('favoritesSongs')
      .populate('playlists');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add song to favorites
router.post('/:id/favorites', async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { favoritesSongs: songId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
