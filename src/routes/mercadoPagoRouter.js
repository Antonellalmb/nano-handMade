const express = require('express');
const router = express.Router()
const mpController = require('../controllers/mpController.js');

// creo las rutas para acceder a MP
router.post("/create_preference", mpController.createPreference);

router.get('/feedback', mpController.feedback);

router.post('/webhook', mpController.webhook)


module.exports = router