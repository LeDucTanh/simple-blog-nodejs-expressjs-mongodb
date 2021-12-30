const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('../models/user.model');

const PostSchema = new schema({
    message: {
        type: String,
    },
    videosLink: [
        {
            type: String,
        },
    ],
    imagesLink: [
        {
            type: String,
        },
    ],
    share: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments',
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    originalPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
});

// PostSchema.pre('save', async function (next) {
//     try {
//         const user = await User.findOne({ username: 'tanh1' });
//         this.createdBy = user._id;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = mongoose.model('posts', PostSchema);
