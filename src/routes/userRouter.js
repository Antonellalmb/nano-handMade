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

//router.get('/adminUsers', controller.adminUsers);
//router.post('/adminUsers/updateCategories', controller.updateCategories);

//router.get('/categorias/:id?', controller.categorias);
//router.post('/categorias', controller.guardarCategorias);

// Ruta para obtener y mostrar categorías
router.get('/categorias', controller.obtenerCategorias);

// Ruta para editar una categoría específica
router.get('/editarCategoria/:id', controller.editarCategoria);

// Ruta para agregar una nueva categoría
router.post('/agregarCategoria', controller.agregarCategoria);

//ruta para guardar edicion de categoriA
router.post('/guardarEdicionCategoria', controller.guardarEdicionCategoria);

// Ruta para eliminar una categoría específica
router.get('/eliminarCategoria/:id', controller.eliminarCategoria);


module.exports = router;