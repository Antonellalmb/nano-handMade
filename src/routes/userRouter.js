const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const cookieExisteMiddleware = require('../middlewares/cookieExisteMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');



//routes login administrador
router.get('/login', controller.login);
router.post('/login', controller.loginProcess);

//routes register
router.get('/register', controller.register);
router.post('/register', controller.processRegister);


module.exports = router;