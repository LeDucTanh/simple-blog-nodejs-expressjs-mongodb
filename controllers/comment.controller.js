const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const createError = require('http-errors');

const add = async (req, res, next) => {
    try {
        const { message, imageLink, userId, postId } = req.body;
        if (!userId || !postId) {
            throw createError.BadRequest('Missing userId or postId');
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({
                code: 200,
                message: 'User is not exist',
            });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(200).json({
                code: 200,
                message: 'Post is not exist',
            });
        }
        const cmt = new Comment({
            message,
            imageLink,
            postId,
            createdBy: userId,
        });
        const savedCmt = await cmt.save();
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: [savedCmt._id] },
        });

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
