 const s3 = require('../config/s3.config');
 
exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	
	params.Key = Date.now() + '--' + req.file.originalname;
	params.Body = req.file.buffer;
    params.ACL = 'public-read';
		
	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}

        // console.log(JSON.stringify(data, null, 3));

        const imageLink = data['Location'];
        res.json({
            imageLink
        })
	});
}