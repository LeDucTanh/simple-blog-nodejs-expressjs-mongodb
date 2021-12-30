const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');

const awsWorker = require('../controllers/aws.controller');

router.post('/upload-file', upload.single('file'), awsWorker.doUpload);

module.exports = router;
