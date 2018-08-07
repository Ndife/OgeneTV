//This file describes the model for any Movie
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: true},
    releaseYear: Number,
    producer:{type: String},
    price:{type: String, required: true},
    movieFile:{type: String, required: true}
})

module.exports = mongoose.model('Movie', movieSchema);