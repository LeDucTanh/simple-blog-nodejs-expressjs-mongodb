const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const mongoose = require('mongoose');

const add = async (req, res, next) => {
    try {
        const { message, userId, postId } = req.body;

        // Validate userId and postId
        const createdBy = mongoose.Types.ObjectId(userId);
        const objectPostId = mongoose.Types.ObjectId(postId);

        const cmt = new Comment({
            message,
            postId: objectPostId,
            createdBy,
        });

        const savedCmt = await cmt.save();

        // Validate post exist
        const post = await Post.findOne({ _id: postId }).populate('comments');

        post.comments.push(savedCmt._id);
        await post.save();

        res.status(201).json({
            code: 201,
            data: {
                id: savedCmt._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { add };
