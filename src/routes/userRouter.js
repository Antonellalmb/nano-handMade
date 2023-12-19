const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const cookieExisteMiddleware = require('../middlewares/cookieExisteMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


const registerValidationMiddleware = [
    validationMiddleware.reglasValidacion,
    validationMiddleware.validateRegister
];


//ROUTES LOGIN

router.get('/login', guestMiddleware, controller.login);
router.post('/login', controller.loginProcess);
router.get('/logout', controller.logout);

//ROUTES REGISTER

router.get('/register', guestMiddleware,  controller.register);
router.post('/register', registerValidationMiddleware, controller.processRegister);

//ROUTES PROFILE

router.get('/perfil', authMiddleware, controller.perfil);
router.get('/editarPerfil', authMiddleware, controller.editarPerfil);
router.put('/editarPerfil/:id', controller.processEditarPerfil);
router.get('/eliminarPerfil', authMiddleware, controller.eliminarPerfil);
router.post('/eliminarPerfil/:id', authMiddleware, controller.eliminarPerfil);


//ROUTES ADMINISTRATOR
// routes adminUsers
router.get('/adminUsers', adminMiddleware, controller.adminUsers);

// Ruta para obtener y mostrar categorías
router.get('/categorias', adminMiddleware, controller.obtenerCategorias);

// Ruta para editar una categoría 
router.get('/editarCategoria/:id', adminMiddleware, controller.editarCategoria);

// Ruta para agregar una nueva categoría
router.post('/agregarCategoria', adminMiddleware, controller.agregarCategoria);

//ruta para guardar edicion de categoria
router.post('/guardarEdicionCategoria', adminMiddleware, controller.guardarEdicionCategoria);

// Ruta para eliminar una categoría 
router.get('/eliminarCategoria/:id', adminMiddleware, controller.eliminarCategoria);


module.exports = router;