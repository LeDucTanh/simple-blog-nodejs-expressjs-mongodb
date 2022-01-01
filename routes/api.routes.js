const express = require('express');
const postRoutes = require('./post.routes');
const cmtRoutes = require('./comment.routes');
const userRoutes = require('./user.routes');
const router = express.Router();

router.use('/post', postRoutes);
router.use('/comment', cmtRoutes);
router.use('/user', userRoutes);

module.exports = router;
