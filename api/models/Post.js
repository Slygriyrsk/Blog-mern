const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    // get this schema using payload from networks when we try posting new content
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true, // we will know when the post is created or updated
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;