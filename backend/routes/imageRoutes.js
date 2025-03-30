const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getImages,
  createImage,
  updateImage,
  deleteImage,
  upload,
} = require('../controllers/imageController');

// Route publique pour obtenir les images d'un album
router.get('/album/:albumId', getImages);

// Routes protégées (nécessitent une authentification)
router.get('/', protect, getImages);
router.post('/', protect, upload.single('image'), createImage);
router.put('/:id', protect, updateImage);
router.delete('/:id', protect, deleteImage);

module.exports = router; 