const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true, unique:true},
    email: {type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    movies:[{type: mongoose.Schema.Types.ObjectId, ref:'movie'}],
    verified: {type:Boolean, require:true},
    status: {type:Boolean, require:true},
    password: {type:String, required:true},

})

module.exports = mongoose.model('User', userScheme);