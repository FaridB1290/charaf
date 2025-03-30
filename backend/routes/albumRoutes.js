const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  upload
} = require('../controllers/albumController');

// Routes publiques
router.get('/', getAlbums);
router.get('/:id', getAlbumById);

// Routes protégées (nécessitent une authentification)
router.post('/', protect, upload.single('image'), createAlbum);
router.put('/:id', protect, upload.single('image'), updateAlbum);
router.delete('/:id', protect, deleteAlbum);

module.exports = router; 