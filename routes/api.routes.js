const express = require('express');
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const cmtRoutes = require('./comment.routes');
const likeRoutes = require('./like.routes');
const router = express.Router();

router.use('/authen', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', cmtRoutes);
router.use('/like', likeRoutes);

module.exports = router;
