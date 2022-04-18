const express = require('express');
const passport = require('passport');
const router = express.Router();

//check for if user is logged in
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// @route  GET /auth/google
// @desc   init google authentication
// @access public
router.get(
  '/',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// @route  GET /auth/google/callback
// @desc   called after google authentication
// @access private
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/',
  })
);

// @route  GET /auth/google/success
// @desc   called when google authentication is successful
// @access private
router.get('/success', isLoggedIn, (req, res) =>
  res.send('Successfully logged in')
);

// @route  GET /auth/google/logout
// @desc   called when the user wishes to logout
// @access private
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.send('Logged Out');
});

module.exports = router;
