const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const cookieExisteMiddleware = require('../middlewares/cookieExisteMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');


const registerValidationMiddleware = [
    validationMiddleware.reglasValidacion,
    validationMiddleware.validateRegister
];


//ROUTES LOGIN

router.get('/login', controller.login);
router.post('/login', controller.loginProcess);
router.get('/logout',controller.logout);

//ROUTES REGISTER

router.get('/register', controller.register);
router.post('/register',registerValidationMiddleware, controller.processRegister);

//ROUTES PROFILE

router.get('/perfil', controller.perfil);
router.get('/editarPerfil', controller.editarPerfil);
router.put('/editarPerfil/:id', controller.processEditarPerfil);
router.get('/eliminarPerfil', controller.eliminarPerfil);
router.post('/eliminarPerfil/:id', controller.eliminarPerfil);


//ROUTES ADMINISTRATOR
// routes adminUsers
router.get('/adminUsers', controller.adminUsers);

// Ruta para obtener y mostrar categorías
router.get('/categorias', controller.obtenerCategorias);

// Ruta para editar una categoría 
router.get('/editarCategoria/:id', controller.editarCategoria);

// Ruta para agregar una nueva categoría
router.post('/agregarCategoria', controller.agregarCategoria);

//ruta para guardar edicion de categoria
router.post('/guardarEdicionCategoria', controller.guardarEdicionCategoria);

// Ruta para eliminar una categoría 
router.get('/eliminarCategoria/:id', controller.eliminarCategoria);


module.exports = router;