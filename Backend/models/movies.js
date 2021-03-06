//This file describes the model for any Movie
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    time: Date,
    title: {type: String, required: true},
    description: {type: String, required: true},
    downloads:{type:Number, default:0},
    releaseYear:{type: Number, required: true},
    producer: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    image: {type: String, required: true},
    imageID: String,
    video: {type: String, required: true},
    videoID: String,
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
})

module.exports = mongoose.model('movie', movieSchema);