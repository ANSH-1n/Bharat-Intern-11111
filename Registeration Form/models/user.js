const mongoose = require("mongoose");

// Defining User Schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;