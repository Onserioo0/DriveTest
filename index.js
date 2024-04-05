// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const app = express();

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Cookies are secure only in production
        httpOnly: true // Mitigate XSS attack risk
    }
}));

// View engine setup
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', appointmentRoutes);

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
