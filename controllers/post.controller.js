// const createError = require('http-errors');
const Post = require('../models/post.model');

const add = async (req, res, next) => {
    try {
        const { message, imageLink, userId } = req.body;
        const imagesLink = [imageLink];
        const post = new Post({
            message,
            imagesLink,
            createdBy: userId,
        });
        const savedPost = await post.save();

        res.status(201).json({
            code: 201,
            data: {
                id: savedPost._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { add };
