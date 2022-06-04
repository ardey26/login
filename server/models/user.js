const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'USERNAME REQUIRED'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'PASSWORD REQUIRED']
    }

},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;