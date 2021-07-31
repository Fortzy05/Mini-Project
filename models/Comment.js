var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var CommentSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Comment', CommentSchema)