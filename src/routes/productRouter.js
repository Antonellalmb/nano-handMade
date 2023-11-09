const express = require('express');
const router = express.Router();
const controller = require("../controllers/productController");



//routes products
router.get('/products', controller.products);


//routes table's administration

// Collection's Table *************************************
router.get('/collectionItemsTable' , controller.itemsCollections);
router.get('/collectionsTable' , controller.collections);
router.post('/collections' , controller.processCollections);
// ********************************************************

// Discount's Table ***************************************
router.get('/discountsTable' , controller.discounts);
router.post('/discounts' , controller.processDiscounts);
// ********************************************************



module.exports = router;