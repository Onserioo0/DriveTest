// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Example middleware for checking if the user is authenticated and a driver
const requireDriver = (req, res, next) => {
  // Logic to check if the user is authenticated and a driver
  if (req.user && req.user.userType === 'Driver') {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};

const ensureAuthenticatedAndDriver = (req, res, next) => {
    if (req.session.userId && req.session.userType === 'Driver') {
        return next();
    } else {
        res.redirect('/login');
    }
};

const attachUserInfo = (req, res, next) => {
    console.log(req.session);
    res.locals.isAuthenticated = req.session.isAuthenticated || false;
    next();
};


module.exports = { ensureAuthenticatedAndDriver, attachUserInfo, requireDriver };
