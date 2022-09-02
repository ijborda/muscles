const passport = require('passport')
const express = require('express')
const router = express.Router()
// const mainController = require('../controllers/index')

// @desc    Authenticate with google
// @route   GET /auth/google 
router.get('/google', passport.authenticate('google'))

// @desc    Google auth callback
// @route   GET /auth/google/callback 
router.get('/google/callback', 
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/dashboard')
  } 
)

// @desc    Logout user
// @route   GET /auth/logout 
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
})


module.exports = router