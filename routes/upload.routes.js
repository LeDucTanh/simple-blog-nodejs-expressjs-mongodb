const express = require('express');
const upload = require('../config/multer.config');
const awsWorker = require('../controllers/aws.controller');
const router = express.Router();

router.post('/upload-file', upload.single('file'), awsWorker.doUpload);

module.exports = router;
