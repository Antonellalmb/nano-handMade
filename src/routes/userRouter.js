const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const cookieExisteMiddleware = require('../middlewares/cookieExisteMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
//const checkAuth = require('../middlewares/checkAuth');
//const checkAdminAuth = require('../middlewares/checkAdminAuth');

const registerValidationMiddleware = [
    validationMiddleware.reglasValidacion,
    validationMiddleware.validateRegister
];




//routes login 
router.get('/login', controller.login);
router.post('/login', controller.loginProcess);
router.get('/logout',controller.logout);

//routes register
router.get('/register', controller.register);
router.post('/register',registerValidationMiddleware, controller.processRegister);

//routes perfil
router.get('/perfil', controller.perfil);
router.get('/editarPerfil', controller.editarPerfil);
router.put('/editarPerfil/:id', controller.processEditarPerfil);
router.get('/eliminarPerfil', controller.eliminarPerfil);
router.post('/eliminarPerfil/:id', controller.eliminarPerfil);

// routes adminUsers
router.get('/adminUsers', controller.adminUsers);
router.post('/adminUsers/updateCategories', controller.updateCategories);



module.exports = router;