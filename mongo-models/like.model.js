const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LikeSchema = new schema({
    likeReact: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId
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
        ref: 'users'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('likes', LikeSchema);