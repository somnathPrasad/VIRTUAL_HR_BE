const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String, 
    },
    companyId: {
        type: mongoose.SchemaTypes.ObjectId
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);