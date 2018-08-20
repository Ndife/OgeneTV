const model = require('../models/admin');
const bcrypt = require('bcrypt');
var user = require('../models/users');
var admin = require('../models/admin');
var mailer = require('../functions/mailer');




// ADMIN METHODS.
exports.adminSignUp = function (req, res) {    
    var query1 = {username:req.body.username}
    var query2 = {email:req.body.email};
    model.find(query1,(err,users)=>{
        if(users.length >=1){
            res.json('username already exist');
        }else {
            model.find(query2,(err,email)=>{ 
                if(email.length >=1){
                    res.json('email already exist');
                }else {
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
    })
}



exports.getAdmin = function (req, res) {
    var query = { email: req.body.email }
    admin.findOne(query,(err,user)=>{
        if(user!=null) {res.json({message:user})}
        else {
             res.json({Error:'email not found'});
        }
    });
}

exports.getAllAdmin = function(req,res){
    admin.find({},(err,data)=>{
        if(err) res.json({Error:err});
        res.json({message:data});
    })
}

exports.searchAdmin = function(req,res){
    var value = req.params.value;
    admin.find({"username":{$regex: value, $options: "i"}},(err,data)=>{
        if(err) res.json({Error:err});
        res.json(data);
    })
}

exports.deleteAdmin = function(req,res){
    var query = {_id:req.params.id};
    admin.find(query,(err,data)=>{
        if(err) { res.json({Error: 'invalid Admin id'})
    }else if(data.length<1){
            res.json({message:'Admin not found'});
    }else {
        admin.findByIdAndDelete(query,(err,data)=>{
            if(err){ res.json({error:err}) }else 
            { res.json({message:'Admin deleted successfully'}) };
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

exports.searchUser = function(req,res){
    var value = req.params.value;
    user.find({"username":{$regex: value, $options: 'i'}},(err,data)=>{
        if(err) res.json({Error:err});
        res.json(data);
    })
}

exports.getAllUsers = function (req, res) {
    user.find({}, function (err, data) {
        if (data.length >= 1) {
            res.json({message: data })
        } else {
            res.json({message: 'No Users Found !!' })
        }
    })
}


exports.BlockUser = function (req, res) {
    var userId = { _id: req.params.id }

    user.findByIdAndUpdate(userId, { status: false }, function (err, data) {
        if (data) res.json({message: 'User Has Been Blocked till Further Notice !!' })
        res.json({message: 'Error Blocking User' });
    })
}

exports.unBlockUser = function (req, res) {
    var userId = { _id: req.params.id }
    user.findByIdAndUpdate(userId, { status: true }, function (err, data) {
        if (data) res.json({message: 'User Has Been UnBlocked!!' })
        res.json({ err: err, message: 'Error UnBlocking User' });
    })
}
// exports.AdminLogin = function(req , res){
//     var email = {email:req.body.email}
//     admin.findOne(email , function(err , result){
//         if(result){
//             bcrypt.compare(req.body.password , result[0].password, function(err, rest){
//                 if(rest){
//                     res.json({message:'login Successful !!'})
//                 }else{
//                     res.json({message:'Admin username or password is Incorrect !!'})
//                 }
//             } )
//         }else{
//             res.json({message:'Admin Email Or Password Does Not Exist !!'})
//         }
//     })
// }

exports.deleteUser = function(req,res){
    var query = {_id:req.params.id};
    user.find(query,(err,data)=>{
        if(err) { res.json({Error: 'invalid user id'});
    }else if(data.length<1){
            res.json({message:'user not found'});
    }else {
        user.findByIdAndDelete(query,(err,data)=>{
            if(err){ res.json({error:err}) }else 
            { res.json({message:'User deleted successfully'}) };
        })
    }
    })
    
} 



