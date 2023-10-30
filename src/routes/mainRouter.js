const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainController");



//route home
router.get('/', controller.home);

//routes products
router.get('/products', controller.products)

//routes login administrador
router.get('/admin', controller.login)


module.exports = router;