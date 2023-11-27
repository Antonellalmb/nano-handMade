const express = require('express');
const router = express.Router();
const controller = require("../controllers/productController");


// ******************************************************************************
// ROUTES PRODUCTS
// ****************************************************************************** 

// Products views **************************************************************
router.get('/products', controller.products);
// *****************************************************************************



// ******************************************************************************
// Products Data Base Tables Administration Routes
// ******************************************************************************

// Product's Table **************************************************************
router.get('/productItemsTable' , controller.itemsProducts);
router.get('/productsTable', controller.productsItem);
router.post('/productsItem', controller.processProductsItem);
router.get('/product/update/:id' , controller.editItemProduct);
router.put('/product/update/:id' , controller.updateItemProduct);
router.get('/product/delete/:id' , controller.deleteItemProduct);
router.delete('/product/delete/:id' , controller.destroyItemProduct);
// *****************************************************************************

// Color's Table ***************************************************************
router.get('/colorItemsTable' , controller.itemsColors);
router.get('/colorsTable' , controller.colors);
router.post('/colors' , controller.processColors);
router.get('/color/update/:id' , controller.editItemColor);
router.put('/color/update/:id' , controller.updateItemColor);
router.get('/color/delete/:id' , controller.deleteItemColor);
router.delete('/color/delete/:id' , controller.destroyItemColor);
router.get('/color/restore/:id' , controller.restoreItemColor);
// *****************************************************************************

// Collection's Table **********************************************************
router.get('/collectionItemsTable' , controller.itemsCollections);
router.get('/collectionsTable' , controller.collections);
router.post('/collections' , controller.processCollections);
router.get('/collection/update/:id' , controller.editItemCollection);
router.put('/collection/update/:id' , controller.updateItemCollection);
router.get('/collection/delete/:id' , controller.deleteItemCollection);
router.delete('/collection/delete/:id' , controller.destroyItemCollection);
router.get('/collection/restore/:id' , controller.restoreItemCollection);
// *****************************************************************************

// Discount's Table ************************************************************
router.get('/discountItemsTable' , controller.itemsDiscounts);
router.get('/discountsTable' , controller.discounts);
router.post('/discounts' , controller.processDiscounts);
router.get('/discount/update/:id' , controller.editItemDiscount);
router.put('/discount/update/:id' , controller.updateItemDiscount);
router.get('/discount/delete/:id' , controller.deleteItemDiscount);
router.delete('/discount/delete/:id' , controller.destroyItemDiscount);
router.get('/discount/restore/:id' , controller.restoreItemDiscount);
// *****************************************************************************



module.exports = router;