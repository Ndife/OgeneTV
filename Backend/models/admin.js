var mongoose = require('mongoose');
var adminShema = mongoose.Schema({
    email: {type: String, 
        required: true, 
       unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    name:{type:String, require:true},
    password: {type:String, required:true},
    
})
module.exports = mongoose.model('admin', adminShema);