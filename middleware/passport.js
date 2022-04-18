const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const config = require('config');

const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get('GClient'),
      clientSecret: config.get('GSecret'),
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        //check if user exists
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log('User Exists');
          return done(null, user);
        }

        //Create User
        user = new User({
          name: profile.displayName,
          email: profile.email,
          googleId: profile.id,
        });

        await user.save();

        console.log('Created User');
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
