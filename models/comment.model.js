const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CommentSchema = new schema({
    message: String,
    imageLink: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        require: true,
    },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'comments' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('comments', CommentSchema);
