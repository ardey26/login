const mongoose = require('mongoose');

postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        required: [true, 'DESCRIPTION REQUIRED']
    }
},
{
    timestamps: true,
}
);

post = mongoose.model('post', postSchema, 'posts');

module.exports = post;


