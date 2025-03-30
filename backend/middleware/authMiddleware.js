const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Get user from database
      const [users] = await pool.query(
        'SELECT id, email FROM users WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      req.user = users[0];
      next();
    } catch (error) {
      console.error('Error in auth middleware:', error);
      res.status(401).json({ message: 'Not authorized' });
    }
  } else if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect }; 