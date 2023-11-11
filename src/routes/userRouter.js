const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");



//routes login administrador
router.get('/login', controller.login);
router.post('/login', controller.loginProcess);

//routes register
router.get('/register', controller.register);


//routes tables administration

//categories

router.get('/usercategory', controller.categories);
router.post('/categories', controller.processCategory)

//users

router.get('/userTable', controller.tablaUser);
router.post('/users', controller.cambiarRol);

//taxes

router.get('/userTaxes', controller.userTax)
router.post('/taxes', controller.taxes)


module.exports = router;