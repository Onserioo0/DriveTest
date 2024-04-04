// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'); // Assuming you are using express-session for session management
const PORT = process.env.PORT || 5000;
const { attachUserInfo } = require('./middleware/authMiddleware');

const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

app.use(attachUserInfo);


// Routes
const userRoutes = require('./routes/userRoutes');
const gRoutes = require('./routes/gRoutes');
const indexRoutes = require('./routes/indexRoutes');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/g2', (req, res) => {
    res.render('g2', { message: null });
});
app.get('/g', (req, res) => {
    res.render('g', { user: null });
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/login', (req, res) => {
    res.render('login');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://joshuaomirera:T6l5jEcAR3KJuKQL@cluster0.sqykrcv.mongodb.net/', {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRoutes);

// Use routes
app.use('/', userRoutes);
app.use('/', gRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});