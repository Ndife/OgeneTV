//This file describes the model for any slider
var mongoose = require('mongoose');

var sliderSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    downloads:{type:Number, default:0},
    releaseYear:{type: Number, required: true},
    producer: {type: String, required: true},
    price: {type: String, required: true},
    sliderImage: {type: String, required: true},
    sliderImageID: String,
    video: {type: String, required: true},
    videoID: String,
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
})

module.exports = mongoose.model('slider', sliderSchema);