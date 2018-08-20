//This file describes the model for any Movie
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    time: Date,
    title: {type: String, required: true},
    description: {type: String, required: true},
    releaseYear:{type: Number, required: true},
    producer: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    image: {type: String, required: true},
    imageID: {type: String, required: true},
    video: {type: String, required: true},
    videoID: {type: String, required: true}
})

module.exports = mongoose.model('movie', movieSchema);