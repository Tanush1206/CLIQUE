import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          
          // Validate email domain - only allow @sst.scaler.com
          if (!email.endsWith('@sst.scaler.com')) {
            return done(null, false, { 
              message: 'Only @sst.scaler.com email addresses are allowed' 
            });
          }

          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // User exists - ensure role field exists (for backward compatibility)
            if (!user.role) {
              user.role = 'user';
              await user.save();
            }
            return done(null, user);
          }

          // Create new user with default role
          user = await User.create({
            googleId: profile.id,
            email: email,
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            picture: profile.photos[0].value,
            role: 'user', // Explicitly set default role
          });

          return done(null, user);
        } catch (error) {
          console.error('Error in Google Strategy:', error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;
