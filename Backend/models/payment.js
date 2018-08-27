var mongoose = require('mongoose');
var paymentSchema = mongoose.Schema({
    user:{type:String, required:true},
    movie:{type:String, required:true},
    mail:{type:String, required:true},
    amount:Number,
    time:Date,
    refNo:{type:String, required:true},
    Status:{type:Boolean, required:true}
})



module.exports = mongoose.model('payments', paymentSchema);