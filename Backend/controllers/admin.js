const model = require('../models/admin');
const bcrypt = require('bcrypt');
var user = require('../models/users');
var admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const key = require('../secretKey');

exports.adminSignUp = function (req, res) {
    var mail = { email: req.body.email }
    model.find(mail, function (err, data) {
        if (data.length >= 1) {
            return res.json({ message: 'user already Exists !!' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                    return res.json({ err: err, message: 'Error creating Password !!' });
                var details = {
                    email: req.body.email,

                }
                model.create(details, function (err) {
                    if (err) res.json({ err: err, message: 'Error During Admin Signup !!' });
                    mailer.adminAdded(details.email,(err,info)=>{
                        if(err){
                            res.json({error:err});
                        }else {
                            res.json({ message: 'Admin Was Created Successfully !!' });
                        }
                    },details.username);
                });
            }) 
        } 

    })
}


exports.AdminGetUser = function (req, res) {
    var mails = { email: req.body.email }
    user.find(mails, function (err, dat) {
        if (dat.length >= 1) {
            res.json({ message: dat });
        } else {
            res.json({ err: err, message: 'user was not found' });
        }
    })
}

exports.AdminGetAllUsers = function (req, res) {
    user.find({}, function (err, data) {
        if (data.length >= 1) {
            res.json({ err: err, message: data })
        } else {
            res.json({ err: err, message: 'No Users Found !!' })
        }
    })
}

exports.BlockUser = function (req, res) {
    var userId = { _id: req.params.id }

    user.findByIdAndUpdate(userId, { status: false }, function (err, data) {
        if (data) res.json({message: 'User Has Been Blocked till Further Notice !!' })
        res.json({ err: err, message: 'Error Blocking User' });
    })
}

exports.unBlockUser = function (req, res) {
    var userId = { _id: req.params.id }
    user.findByIdAndUpdate(userId, { status: true }, function (err, data) {
        if (data) res.json({message: 'User Has Been UnBlocked!!' })
        res.json({ err: err, message: 'Error UnBlocking User' });
    })
}

exports.AdminLogin = function(req , res){
    var email = {email:req.body.email}
    admin.find(email , function(err , result){
        if(result.length>=1){
            bcrypt.compare(req.body.password , result[0].password, function(err, rest){
                if(rest){
                          const token = jwt.sign({
                             email: result[0].email,
                             id: result[0]._id
                         }, 
                         `${key.secretkey()}`,
                     );
                        return res.status(200).json({
                             message:'login successful',
                             token,
         
                         });
                     
                }else{
                    res.json({message:'Admin username or password is Incorrect !!'})
                }
            } )
        }else{
            res.json({message:'Admin Email Or Password Does Not Exist !!'})
        }
    })
}
exports.SearchUser = function(req,res){
    var name =  req.body.name
    user.find({'name':{$regex:name,$options:'i'}},'-__v', function(err, data){
        if(err){
            res.json({err:err, message:'Error Encountered In finding USer'})
        }else if(data.length == 0){
            res.json({err:err, message:'Could Not Find Movie !!'})

        }else{
            res.json({data})
        }

    })
}



