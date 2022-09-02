const express = require('express')
const router = express.Router() 
const mainController = require('../controllers/index')
const {ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Grid')

// @desc    Login/landing page
// @route   GET / 
router.get('/', ensureGuest, mainController.getIndex) 

// @desc    Dashboards
// @route   GET /dashboard 
router.get('/dashboard', ensureAuth, mainController.getDashboard) 

// @desc    Saves new entry in dashboard
// @route   PUT /dashboard/save 
router.put('/dashboard/save', mainController.saveInDb) 

// @desc    Delete account
// @route   DELETE /dashboard/delete 
router.delete('/dashboard/delete', mainController.deleteAccount) 

module.exports = router