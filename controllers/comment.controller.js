const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

const add = async (req, res, next) => {
    try {
        const { message, imageLink, userId, postId } = req.body;
        if (!userId || !postId) {
            throw createError.BadRequest('Missing userId or postId');
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(200).json({
                code: 200,
                message: 'User is not exist',
            });
        }
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(200).json({
                code: 200,
                message: 'Post is not exist',
            });
        }
        const createdBy = mongoose.Types.ObjectId(userId);
        const objectPostId = mongoose.Types.ObjectId(postId);
        const cmt = new Comment({
            message,
            imageLink,
            postId: objectPostId,
            createdBy,
        });
        const savedCmt = await cmt.save();
        post.comments.push(savedCmt._id);
        await post.save();

        res.status(201).json({
            code: 201,
            message: 'Your comment has been created',
            data: {
                id: savedCmt._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { add };
