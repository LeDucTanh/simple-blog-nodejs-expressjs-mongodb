const express = require('express');
const controller = require('../controllers/post.controller');
const upload = require('../config/multer.config');
const awsWorker = require('../controllers/aws.controller');
const router = express.Router();

router.post('/add', upload.single('file'), awsWorker.doUpload, controller.add);

module.exports = router;
