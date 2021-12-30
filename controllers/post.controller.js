const createError = require('http-errors');
const Post = require('../models/post.model');

const add = async (req, res, next) => {
    try {
        const { message, imageLink } = req.body;
        const imagesLink = [imageLink];
        const post = new Post({
            message,
            imagesLink,
        });

        const savedPost = await post.save();
        res.status(200).json({
            message: 'Created a post successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { add };
