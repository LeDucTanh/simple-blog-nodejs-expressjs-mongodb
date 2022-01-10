const controller = require('../controllers/like.controller');
const middleware = require('../helpers/custom-middleware');
const express = require('express');
const router = express.Router();

router.post(
    '/add',
    middleware.verifyUser,
    middleware.verifyPost,
    controller.likeOrUnLike
);

router.get('/list', controller.list);

module.exports = router;
