//This file describes the model for any Category
var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Category', categorySchema);