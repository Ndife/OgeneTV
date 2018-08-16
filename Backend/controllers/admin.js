const model = require('../models/admin');
const bcrypt = require('bcrypt');
var user = require('../models/users');
var admin = require('../models/admin');
var mailer = require('../functions/mailer');



// ADMIN METHODS.
exports.adminSignUp = function (req, res) {
    var mail = {email: req.body.email}
    model.find(mail, function (err, data) {
        if (data.length >= 1) {
            return res.json({ message: 'email already Exists !!' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                    return res.json({message: 'Error creating Password !!' });
                var details = {
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                }
                model.create(details, function (err) {
                    if (err) res.json({message: 'Error During Admin Signup !!' });
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



// USERS/CLIENT METHODS.
exports.getUser = function (req, res) {
    var mails = { email: req.body.email }
    user.find(mails, function (err, dat) {
        if (dat.length >= 1) {
            res.json({ message: dat });
        } else {
            res.json({message: 'user was not found' });
        }
    })
}

exports.adminGetAllUsers = function (req, res) {
    user.find({}, function (err, data) {
        if (data.length >= 1) {
            res.json({ err: err, message: data })
        } else {
            res.json({ err: err, message: 'No Users Found !!' })
        }
    })
}

exports.getAdmin = function (email, callback) {
    var query = { email: email }
    admin.findOne(query, callback);
}

exports.getAdminByid = function (id, callback) {
    admin.findById(id, callback);
}

exports.decrypt = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err
        callback(null, isMatch);
    });
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



