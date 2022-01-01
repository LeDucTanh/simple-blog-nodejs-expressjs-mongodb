const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controllers');
const verifyToken = require('../middlewares/user');

router.post('/login', userController.login);
router.post('/register', userController.register);
// router.put('/edit', verifyToken ,cart.Item)

module.exports = router;
