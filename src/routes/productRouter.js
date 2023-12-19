const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const uploadFile = require ('../middlewares/multerMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware');

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
router.get('/productItemsTable' , adminMiddleware, controller.itemsProducts);
router.get('/productsTable', adminMiddleware, controller.productsItem);
router.post('/productsItem', adminMiddleware, uploadFile.any('image'), controller.processProductsItem);
router.get('/product/update/:id', adminMiddleware, controller.editItemProduct);
router.put('/product/update/:id', adminMiddleware, uploadFile.any('image') , controller.updateItemProduct);
router.get('/product/delete/:id', adminMiddleware, controller.deleteItemProduct);
router.delete('/product/delete/:id', adminMiddleware, controller.destroyItemProduct);
// *****************************************************************************

// Size's Table ***************************************************************
router.get('/sizeItemsTable', adminMiddleware, controller.itemsSizes);
router.get('/sizesTable' , adminMiddleware, controller.sizes);
router.post('/sizes' , adminMiddleware, controller.processSizes);
router.get('/size/update/:id', adminMiddleware, controller.editItemSize);
router.put('/size/update/:id' , adminMiddleware, controller.updateItemSize);
router.get('/size/delete/:id' , adminMiddleware, controller.deleteItemSize);
router.delete('/size/delete/:id' , adminMiddleware, controller.destroyItemSize);
router.get('/size/restore/:id' , adminMiddleware, controller.restoreItemSize);
// *****************************************************************************

// Color's Table ***************************************************************
router.get('/colorItemsTable' , adminMiddleware, controller.itemsColors);
router.get('/colorsTable' , adminMiddleware, controller.colors);
router.post('/colors' , adminMiddleware, controller.processColors);
router.get('/color/update/:id', adminMiddleware, controller.editItemColor);
router.put('/color/update/:id', adminMiddleware, controller.updateItemColor);
router.get('/color/delete/:id', adminMiddleware, controller.deleteItemColor);
router.delete('/color/delete/:id', adminMiddleware, controller.destroyItemColor);
router.get('/color/restore/:id', adminMiddleware, controller.restoreItemColor);
// *****************************************************************************

// Collection's Table **********************************************************
router.get('/collectionItemsTable', adminMiddleware, controller.itemsCollections);
router.get('/collectionsTable',  adminMiddleware, controller.collections);
router.post('/collections', adminMiddleware, controller.processCollections);
router.get('/collection/update/:id', adminMiddleware, controller.editItemCollection);
router.put('/collection/update/:id', adminMiddleware, controller.updateItemCollection);
router.get('/collection/delete/:id',adminMiddleware, controller.deleteItemCollection);
router.delete('/collection/delete/:id', adminMiddleware, controller.destroyItemCollection);
router.get('/collection/restore/:id', adminMiddleware, controller.restoreItemCollection);
// *****************************************************************************

// Discount's Table ************************************************************
router.get('/discountItemsTable', adminMiddleware, controller.itemsDiscounts);
router.get('/discountsTable', adminMiddleware, controller.discounts);
router.post('/discounts', adminMiddleware, controller.processDiscounts);
router.get('/discount/update/:id', adminMiddleware, controller.editItemDiscount);
router.put('/discount/update/:id', adminMiddleware, controller.updateItemDiscount);
router.get('/discount/delete/:id', adminMiddleware, controller.deleteItemDiscount);
router.delete('/discount/delete/:id', adminMiddleware, controller.destroyItemDiscount);
router.get('/discount/restore/:id', adminMiddleware, controller.restoreItemDiscount);
// *****************************************************************************

module.exports = router;