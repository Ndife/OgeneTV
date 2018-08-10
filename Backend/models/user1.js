var mongoose = require('mongoose');
var user1Schema = mongoose.Schema({
    f_name:String,
    facebookId:String,
    f_image:String
    // username:String,
    // googleId:String
})

module.exports = mongoose.model('user', user1Schema);