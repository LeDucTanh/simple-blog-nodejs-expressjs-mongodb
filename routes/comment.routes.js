const cmtController = require('../controllers/comment.controller');
const express = require('express');
const router = express.Router();

router.post('/add', cmtController.add);

module.exports = router;
