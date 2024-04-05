// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || ''; // Assuming the token is sent in a cookie
    try {
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded user info to request object
        next();
    } catch (error) {
        console.error('Token error:', error.message);
        return res.status(401).send('Unauthorized: Invalid token');
    }
};

const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
      return next();
  } else {
      res.redirect('/login');
  }
};

const ensureAuthenticatedAndDriver = (req, res, next) => {
  if (req.session.userId && req.session.userType === 'Driver') {
      next();
  } else {
      res.redirect('/login');
  }
};

const ensureAuthenticatedAndAdmin = (req, res, next) => {
  if (req.session.userId && req.session.userType === 'Admin') {
      next();
  } else {
      res.redirect('/login');
  }
};

module.exports = { ensureAuthenticated, ensureAuthenticatedAndDriver, ensureAuthenticatedAndAdmin, verifyToken };
