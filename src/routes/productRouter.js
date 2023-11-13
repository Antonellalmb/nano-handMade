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
router.get('/collection/update/:id' , controller.editItemCollection);
router.put('/collection/update/:id' , controller.updateItemCollection);
router.get('/collection/delete/:id' , controller.deleteItemCollection);
router.delete('/collection/delete/:id' , controller.destroyItemCollection);
// ********************************************************

// Discount's Table ***************************************
router.get('/discountItemsTable' , controller.itemsDiscounts);
router.get('/discountsTable' , controller.discounts);
router.post('/discounts' , controller.processDiscounts);
router.get('/discount/update/:id' , controller.editItemDiscount);
router.put('/discount/update/:id' , controller.updateItemDiscount);
router.get('/discount/delete/:id' , controller.deleteItemDiscount);
router.delete('/discount/delete/:id' , controller.destroyItemDiscount);
// ********************************************************



module.exports = router;