const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new Schema({
    message: {
        type: String
    },
    videosLink: [
        {
            type: String
        }
    ],
    imagesLink: [
        {
            type: String
        }
    ],
    share: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    originalPostId: {
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
})

module.exports = mongoose.model('posts', PostSchema);