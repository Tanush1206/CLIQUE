const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const allowedDomain = 'sst.scaler.com';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/api/auth/google/callback';

if (!clientID || !clientSecret) {
  console.warn('Google OAuth env vars not set; Google login will not work until configured.');
}

passport.use(
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        const domain = (email || '').split('@')[1];
        if (domain !== allowedDomain) {
          return done(null, false, { message: 'Email domain not allowed' });
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            avatarUrl: profile.photos && profile.photos[0] && profile.photos[0].value,
            googleId: profile.id,
            provider: 'google',
          });
        } else if (user.provider !== 'google') {
          user.googleId = profile.id;
          user.provider = 'google';
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;


