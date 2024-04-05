// config/authConfig.js

require('dotenv').config();

const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || 'your_default_secret',
        expiresIn: '1h',
    },
    // Add more authentication-related configurations here.
    // For example, OAuth settings if you're using social logins:
    // google: {
    //     clientID: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL: "/auth/google/callback",
    // },
    // facebook: {
    //     clientID: process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL: "/auth/facebook/callback",
    // }
};

module.exports = authConfig;
