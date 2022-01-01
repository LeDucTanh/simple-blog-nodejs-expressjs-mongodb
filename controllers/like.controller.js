const Like = require('../models/like.model');
const Post = require('../models/post.model');
const createError = require('http-errors');

const likeOrUnLike = async (req, res, next) => {
    try {
        const { postId, userId } = req.body;
        const existLike = await Like.findOne({ createdBy: userId, postId });
        if (existLike) {
            let message;
            if (existLike.likeReact === 'like') {
                await existLike.updateOne({ likeReact: 'nil' });
                message = 'Unliked';
            } else {
                await existLike.updateOne({ likeReact: 'like' });
                message = 'Liked';
            }
            return res.status(200).json({
                code: 200,
                message,
                data: {
                    id: existLike._id,
                },
            });
        }
        const like = new Like({
            postId,
            createdBy: userId,
        });
        const savedLike = await like.save();
        res.status(201).json({
            code: 201,
            message: 'Liked',
            data: {
                id: savedLike._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    try {
        const { id } = req.query;
        const post = await Post.findById(id);
        if (!post) {
            throw createError.BadRequest('Post is not exist');
        }
        // const likes = await Like.find(
        //     { postId: id },
        //     { pupulate: { path: 'createdBy' } }
        // );
        const likes = await Like.find(
            { postId: id, likeReact: 'like' },
            { createdBy: 1 }
        ).populate('createdBy');
        res.status(200).json({
            code: 200,
            message: 'success',
            data: {
                list: likes,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { likeOrUnLike, list };
