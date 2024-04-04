// middleware/authMiddleware.js

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


module.exports = { ensureAuthenticatedAndDriver, attachUserInfo };
