const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'charaf_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected');

    // Supprimer la table users si elle existe
    await connection.query('DROP TABLE IF EXISTS users');
    console.log('Old users table dropped');

    // Créer la table users avec la bonne structure
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Créer la table albums si elle n'existe pas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS albums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Albums table verified');

    // Supprimer la table images si elle existe pour la recréer avec la bonne structure
    await connection.query('DROP TABLE IF EXISTS images');
    console.log('Old images table dropped');

    // Créer la table images avec la bonne structure
    await connection.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT,
        imageUrl VARCHAR(255) NOT NULL,
        link VARCHAR(255),
        album_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
      )
    `);
    console.log('Images table created with correct structure');

    // Créer l'utilisateur admin s'il n'existe pas
    const [adminExists] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@charaf.com']);
    if (adminExists.length === 0) {
      const hashedPassword = await bcrypt.hash('charafcharaf', 10);
      await connection.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        ['admin@charaf.com', hashedPassword]
      );
      console.log('Admin user created');
    }

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

module.exports = { pool, initDB }; 