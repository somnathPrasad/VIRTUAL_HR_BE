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
    aadharNumber: {
        type: String,
    },
    panNumber: {
        type: String,
    },
    mobileNumber:{
        type: mongoose.SchemaTypes.String
    },
    address:{
        type: String
    },
    email: {
        type: String
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);