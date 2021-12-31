const s3 = require('../config/s3.config');

const doUpload = (req, res, next) => {
    const s3Client = s3.s3Client;
    const params = s3.uploadParams;
    params.Key = Date.now() + '--' + req.file.originalname;
    params.Body = req.file.buffer;
    params.ACL = 'public-read';

    s3Client.upload(params, (err, data) => {
        if (err) {
            return next(err);
        }
        // console.log(JSON.stringify(data, null, 3));
        req.body.imageLink = data['Location'];
        next();
    });
};

module.exports = { doUpload };
