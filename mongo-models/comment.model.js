const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CommentSchema = new schema({
    message: {
        type: String
    },
    imageLink: {
        type: String
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId
    },
    parentCommentId: {
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