var model = require('../models/payment');
var movie = require('../models/movies');
var user = require('../models/users')

exports.viewPayments = function(req,res){
    model.find({}, function(err,payment){
        if(payment){
            res.json({payment})
        }else if(err){
            res.json({err:err})
        }else{
            res.json({message:'Error Getting Payments'})
        }
    })
}