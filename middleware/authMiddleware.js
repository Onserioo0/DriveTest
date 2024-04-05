// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || ''; // Assuming the token is sent in a cookie
    try {
        if (!token) {
            return res.status(401).json({ errorMessage: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded; // Add decoded user info to request object
        next();
    } catch (error) {
        console.error('Token error:', error);
        return res.status(401).json({ errorMessage: 'Unauthorized' });
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

// const attachUserInfo = (req, res, next) => {
//   res.locals.isAuthenticated = !!req.session.userId;
//   res.locals.userType = req.session.userType || '';
//   next();
// };


module.exports = { ensureAuthenticated, ensureAuthenticatedAndDriver, ensureAuthenticatedAndAdmin, verifyToken };
