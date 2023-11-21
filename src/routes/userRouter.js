const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const cookieExisteMiddleware = require('../middlewares/cookieExisteMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');



//routes login administrador
router.get('/login', controller.login);
router.post('/login', controller.loginProcess);
router.get('/logout',controller.logout);

//routes register
router.get('/register', controller.register);
router.post('/register', controller.processRegister);

//routes perfil
router.get('/perfil', controller.perfil);
router.get('/editarPerfil', controller.editarPerfil);
router.post('/editarPerfil/:id', controller.processEditarPerfil);
router.get('/eliminarPerfil', controller.eliminarPerfil);
router.post('/eliminarPerfil/:id', controller.eliminarPerfil);


module.exports = router;