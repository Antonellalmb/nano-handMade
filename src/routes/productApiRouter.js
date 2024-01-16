const express = require('express');
const router = express.Router();
const controller = require('../controllers/productApiController');

// ******************************************************************************
// ROUTES API PRODUCTS
// ****************************************************************************** 

// Products  ***************************************************************
router.get('/', controller.products);
router.get('/mar', controller.productsMar);
router.get('/terra', controller.productsTerra);
router.get('/luminarias', controller.productsLuminarias);
router.get('/search', controller.productsSearch);
router.get('/:id', controller.product);

// ******************************************************************************


module.exports = router;