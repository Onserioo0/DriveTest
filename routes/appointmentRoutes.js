// routes/indexRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const isAuthenticated = req.session.userId; // Check if the user is authenticated
  const userType = req.session.userType; // Get the user's userType from the session

  // Render the template with the necessary data
  res.render('index', {
    isAuthenticated,
    showGLinks: isAuthenticated && userType === 'Driver' // Determine if G links should be shown
  });
});

module.exports = router;
