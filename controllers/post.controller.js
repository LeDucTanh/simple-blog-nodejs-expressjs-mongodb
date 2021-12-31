// const createError = require('http-errors');
const Post = require('../models/post.model');
const mongoose = require('mongoose');

const add = async (req, res, next) => {
    try {
        const { message, imageLink, userId } = req.body;
        const imagesLink = [imageLink];
        const createdBy = mongoose.Types.ObjectId(userId);
        const post = new Post({
            message,
            imagesLink,
            createdBy,
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
