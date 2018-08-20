var mongoose = require('mongoose');
var user1Schema = mongoose.Schema({
    name:String,
    email:String,
    movies:[{type: mongoose.Schema.Types.ObjectId,ref:'movies'}],
    verified: {type:Boolean, require:true},
    status:{type:Boolean, require:true},
    password:String
 
})

module.exports = mongoose.model('user', user1Schema);