const { pool } = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Assurez-vous que ce dossier existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

const getImages = async (req, res) => {
  try {
    // Récupérer albumId soit des paramètres d'URL soit des query params
    const albumId = req.params.albumId || req.query.albumId;
    console.log('Fetching images for album:', albumId);

    if (!albumId) {
      return res.status(400).json({ message: 'Album ID is required' });
    }

    const [images] = await pool.query(
      'SELECT * FROM images WHERE album_id = ?',
      [albumId]
    );

    console.log('Images found:', images);
    res.json(images);
  } catch (error) {
    console.error('Error in getImages:', error);
    res.status(500).json({ message: error.message });
  }
};

const createImage = async (req, res) => {
  try {
    console.log('Creating image with body:', req.body);
    console.log('File:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const { description, link, albumId } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    // Vérifier si l'album existe
    const [albums] = await pool.query('SELECT * FROM albums WHERE id = ?', [albumId]);
    if (albums.length === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }

    const [result] = await pool.query(
      'INSERT INTO images (description, imageUrl, link, album_id) VALUES (?, ?, ?, ?)',
      [description, imageUrl, link || null, albumId]
    );

    const [newImage] = await pool.query('SELECT * FROM images WHERE id = ?', [result.insertId]);
    console.log('Image created:', newImage[0]);
    res.status(201).json(newImage[0]);
  } catch (error) {
    console.error('Error in createImage:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const { description, imageUrl, link } = req.body;
    const [result] = await pool.query(
      'UPDATE images SET description = ?, imageUrl = ?, link = ? WHERE id = ?',
      [description, imageUrl, link, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const [image] = await pool.query('SELECT * FROM images WHERE id = ?', [req.params.id]);
    res.json(image[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM images WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image removed' });
  } catch (error) {
    console.error('Error in deleteImage:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getImages,
  createImage,
  updateImage,
  deleteImage,
  upload
}; 