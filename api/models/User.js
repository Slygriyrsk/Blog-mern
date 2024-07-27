const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, min: 4, unique: true },
    password: { type: String, required: true },
});

const UserModel = model('User', UserSchema); // export User correctly otherwise it could cause err in fetching user details in the post

module.exports = UserModel;