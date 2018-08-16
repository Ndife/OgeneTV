//This file describes the model for any Movie
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    time: Date,
    title: {type: String, required: true},
    description: {type: String, required: true},
    releaseYear: Number,
    producer: String,
    category: String,
    price: {type: String, required: true},
    image: String,
    imageID: String,
    video: String,
    videoID: String
})

module.exports = mongoose.model('Movie', movieSchema);