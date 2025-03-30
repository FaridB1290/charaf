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

const getAlbums = async (req, res) => {
  try {
    console.log('Fetching albums from database...');
    const [albums] = await pool.query('SELECT * FROM albums');
    console.log('Albums fetched:', albums);
    res.json(albums);
  } catch (error) {
    console.error('Error in getAlbums:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAlbumById = async (req, res) => {
  try {
    console.log('Fetching album by id:', req.params.id);
    const [albums] = await pool.query('SELECT * FROM albums WHERE id = ?', [req.params.id]);
    
    if (albums.length === 0) {
      console.log('Album not found');
      return res.status(404).json({ message: 'Album not found' });
    }

    console.log('Album found:', albums[0]);
    res.json(albums[0]);
  } catch (error) {
    console.error('Error in getAlbumById:', error);
    res.status(500).json({ message: error.message });
  }
};

const createAlbum = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const { name } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const [result] = await pool.query(
      'INSERT INTO albums (name, image) VALUES (?, ?)',
      [name, imageUrl]
    );

    const [album] = await pool.query('SELECT * FROM albums WHERE id = ?', [result.insertId]);
    res.status(201).json(album[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl = req.body.image; // Garde l'ancienne image par défaut

    // Si une nouvelle image est uploadée
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const [result] = await pool.query(
      'UPDATE albums SET name = ?, image = ? WHERE id = ?',
      [name, imageUrl, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    const [album] = await pool.query('SELECT * FROM albums WHERE id = ?', [req.params.id]);
    res.json(album[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM albums WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json({ message: 'Album removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  upload
}; 