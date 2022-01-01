const cmtController = require('../controllers/comment.controller');
const middleware = require('../helpers/custom-middleware');
const express = require('express');
const router = express.Router();

router.post(
    '/add',
    middleware.verifyUser,
    middleware.verifyPost,
    cmtController.add
);
router.get('/list', cmtController.getList);
router.post(
    '/reply',
    middleware.verifyUser,
    middleware.verifyPost,
    cmtController.reply
);
router.put('/', middleware.verifyUser, cmtController.update);
router.delete('/', cmtController.deleteComment); // need to add verify access token

module.exports = router;
