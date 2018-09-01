//This file describes the model for any review
var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    time: Date,
    review: {type: String, required: true}
})

module.exports = mongoose.model('review', reviewSchema);