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
    createdOn: {
        type: Date,
        default: Date.now,
    },
    updatedOn: {
        type: Date,
        default: Date.now,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    updatedBy: { type: mongoose.Schema.Types.ObjectId },
    token: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('users', UserSchema)
