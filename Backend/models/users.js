const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    name:{type:String, required:true},
    email: {type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    movies:[{type: mongoose.Schema.Types.ObjectId,ref:'movies'}],
    verified: {type:Boolean, require:true},
    status: {type:Boolean, require:true},
    password: {type:String, required:true},

})

module.exports = mongoose.model('User', userScheme);