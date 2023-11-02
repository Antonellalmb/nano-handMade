const express = require('express');
const router = express.Router();
const controller = require("../controllers/productController");



//routes products
router.get('/products', controller.products);



module.exports = router;