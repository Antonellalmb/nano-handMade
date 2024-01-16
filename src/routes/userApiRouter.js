const express = require('express');
const router = express.Router();
const controller = require("../controllers/userApiController");
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', adminMiddleware, controller.list)
router.get('/:id', adminMiddleware, controller.detail)

module.exports = router;