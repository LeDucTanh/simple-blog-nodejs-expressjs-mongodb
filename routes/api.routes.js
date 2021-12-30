const express = require('express');
const postRoutes = require('./post.routes');
const router = express.Router();

router.use('/post', postRoutes);

module.exports = router;
