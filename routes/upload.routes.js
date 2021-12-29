let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config');
 
const awsWorker = require('../controllers/aws.controller');
 
router.post('/api/upload-file', upload.single('file'), awsWorker.doUpload);
 
module.exports = router;