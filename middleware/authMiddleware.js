// middleware/authMiddleware.js

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

const attachUserInfo = (req, res, next) => {
  res.locals.isAuthenticated = !!req.session.userId;
  res.locals.userType = req.session.userType || '';
  next();
};

module.exports = { ensureAuthenticated, ensureAuthenticatedAndDriver, ensureAuthenticatedAndAdmin, attachUserInfo };
