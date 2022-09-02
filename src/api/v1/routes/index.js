const express = require('express');

const router = express.Router();
const mainController = require('../controllers/index');
const { ensureGuest } = require('../middleware/auth');

// @desc    Login/landing page
// @route   GET /
router.get('/', ensureGuest, mainController.getIndex);

module.exports = router;
