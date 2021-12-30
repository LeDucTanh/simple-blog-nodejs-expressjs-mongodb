const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LikeSchema = new schema({
    likeReact: {
        type: String,
        enum: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'],
        default: 'like',
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
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

module.exports = mongoose.model('likes', LikeSchema);
