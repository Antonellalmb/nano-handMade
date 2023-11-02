const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");



//routes login administrador
router.get('/login', controller.login);
router.post('/login', controller.loginProcess);

//routes register
router.get('/register', controller.register);


module.exports = router;