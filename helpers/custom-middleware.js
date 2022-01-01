const Post = require('../models/post.model');
const User = require('../models/user.model');
const createError = require('http-errors');

const verifyUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            throw createError.BadRequest('Missing userId');
        }
        const user = await User.findById(userId);
        if (!user) {
            throw createError.BadRequest('User is not exist');
        }
        req.body.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const verifyPost = async (req, res, next) => {
    try {
        const { postId } = req.body;
        if (!postId) {
            throw createError.BadRequest('Missing postId');
        }
        const post = await Post.findById(postId);
        if (!post) {
            throw createError.BadRequest('Post is not exist');
        }
        req.body.post = post;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyUser, verifyPost };
