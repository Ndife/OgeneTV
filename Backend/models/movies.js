//This file describes the model for any Movie
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    time: Date,
    title: {type: String, required: true},
    description: {type: String, required: true},
    releaseYear: Number,
    producer: String,
    downloads:{type:Number, default:0},
    category: String,
    price: {type: String, required: true},
    image: {type: String},
    video: {type: String}
})

module.exports = mongoose.model('movie', movieSchema);