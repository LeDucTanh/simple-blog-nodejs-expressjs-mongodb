const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        require: true,
    },
    password: {
        type: String,
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
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    updatedBy: { type: mongoose.Schema.Types.ObjectId },
})

module.exports = mongoose.model('users', UserSchema)
