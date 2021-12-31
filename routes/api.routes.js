const express = require('express');
const postRoutes = require('./post.routes');
const cmtRoutes = require('./comment.routes');
const router = express.Router();

router.use('/post', postRoutes);
router.use('/comment', cmtRoutes);

module.exports = router;
