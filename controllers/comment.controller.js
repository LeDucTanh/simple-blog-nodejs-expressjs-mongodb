const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const createError = require('http-errors');

const add = async (req, res, next) => {
    try {
        const { message, imageLink, userId, postId } = req.body;
        const cmt = new Comment({
            message,
            imageLink,
            postId,
            createdBy: userId,
        });
        const savedCmt = await cmt.save();
        // await Post.findByIdAndUpdate(postId, {
        //     $push: { comments: [savedCmt._id] },
        // });

        res.status(201).json({
            status: 201,
            message: 'Your comment has been created',
            data: {
                id: savedCmt._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getList = async (req, res, next) => {
    try {
        const { id } = req.query;
        const post = await Post.findById(id);
        if (!post) {
            throw createError.BadRequest('Post is not exist');
        }
        const newPost = await post.populate({
            path: 'comments',
            match: { cmtParentId: null },
            populate: {
                path: 'childComments',
            },
        });

        res.status(200).json({
            status: 200,
            message: 'success',
            data: {
                comments: newPost.comments,
            },
        });
    } catch (error) {
        next(error);
    }
};

const reply = async (req, res, next) => {
    try {
        const { message, imageLink, userId, postId, cmtParentId } = req.body;
        const comment = await Comment.findById(cmtParentId);
        if (!comment) {
            throw createError.BadRequest('Comment is not exist');
        }
        const cmt = new Comment({
            message,
            imageLink,
            postId,
            createdBy: userId,
            cmtParentId,
        });
        const savedCmt = await cmt.save();

        res.status(201).json({
            status: 201,
            message: 'Your reply has been created',
            data: {
                id: savedCmt._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id, message } = req.body;
        const comment = await Comment.findByIdAndUpdate(id, {
            message,
            updatedAt: Date.now(),
        });
        if (!comment) {
            throw createError.BadRequest('Comment is not exist');
        }
        res.status(200).json({
            status: 200,
            message: 'Comment updated',
        });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.query;
        const comment = await Comment.findById(id);
        if (!comment) {
            throw createError.BadRequest('Comment is not exist');
        }
        const subComments = await Comment.find({ cmtParentId: id });
        await Promise.all(
            subComments.map(item => {
                item.remove();
            })
        );
        await comment.remove();
        res.status(200).json({
            status: 200,
            message: 'Comment deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { add, getList, reply, update, deleteComment };
