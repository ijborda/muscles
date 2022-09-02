const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const { ensureAuth } = require('../middleware/auth');

// @desc    Dashboards
// @route   GET /dashboard
router.get('/', ensureAuth, dashboardController.getDashboard);

// @desc    Saves new entry in dashboard
// @route   PUT /dashboard/save
router.put('/save', dashboardController.saveInDb);

// @desc    Delete account
// @route   DELETE /dashboard/delete
router.delete('/delete', dashboardController.deleteAccount);

module.exports = router;
