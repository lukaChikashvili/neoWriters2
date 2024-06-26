const mongoose = require('mongoose');

// create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    proffesion: {
        type: String,
        required: true
    },


}, {timestamps: true});


const User = mongoose.model('user', userSchema);

module.exports = {User};