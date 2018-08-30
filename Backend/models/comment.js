//This file describes the model for any comment
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    time: Date,
    commentBody: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('comment', commentSchema);