const express = require('express')
const router = express.Router()


// @desc Login/Landing Page
// @route GET /
router.get('/', (req, res) => {
    //first argument is the hb view
    //second is the hb layout
    res.render('login', {
        layout: 'login'
    })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

module.exports = router