const cmtController = require('../controllers/comment.controller');
const express = require('express');
const router = express.Router();

router.post('/add', cmtController.add);
router.get('/list', cmtController.getList);
router.post('/reply', cmtController.reply);

module.exports = router;
