//This file describes the model for any slider
var mongoose = require('mongoose');

var sliderSchema = mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    imageID: String
})

module.exports = mongoose.model('slider', sliderSchema);