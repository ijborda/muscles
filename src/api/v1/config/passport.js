const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose'); 
const User = require('../models/User');

module.exports = passport => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: [ 'profile' ],
    state: true
  }, 
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value, 
    }
    try {
      let user = await User.findOne({googleId: profile.id})  
      if (user) {
        done(null, user);
      } else {
        await User.create(newUser)
        user = await User.findOne({googleId: profile.id})  
        done(null, user); 
      }
    } catch (err) {
      console.error(err)
    }
  }));
  
  passport.serializeUser(function(user, done) {
    process.nextTick(function() {
      done(null, {id: user._id});
    });
  });
  
  passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
      User.findById(user.id, (err, user) => done(err, user));
    });
  });
};

