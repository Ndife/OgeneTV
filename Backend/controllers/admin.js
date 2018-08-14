
const model = require('../models/admin');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var user = require('../models/users');
var admin = require('../models/admin');




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
                    name: req.body.name,
                    password: hash,

                }

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'stilesndife@gmail.com',
                        pass: 'j0sephbr0'
                    }
                });
                function subscriberAdded(email) {
                    var mailOptions = {
                        from: '"OgeneTV"',
                        to: email,
                        subject: 'Welcome to OgeneTV Admin Page',
                        html: `<center><h2><strong></string>Thanks For Signning Up As Admin </strong></h2><center>
           
               <p> You Have Successfully Signed Up as OgeneTv Admin  and your Login email is </p>
               ` + details.email + `            
               <p> Your Password is</p>
                ` + req.body.password


                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            return false;
                        } else {
                            console.log('Email sent: ' + info.response);
                            return true;
                        }
                    });
                }

                model.create(details, function (err) {
                    if (err) res.json({ err: err, message: 'Error During Admin Signup !!' });
                    res.json({ message: 'Admin Was Created Successfully !!' });

                    subscriberAdded(details.email);

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
        if (data) res.json({ err: err, message: 'User Has Been Blocked till Further Notice !!' })
        res.json({ err: err, message: 'Error Blocking User' });
    })
}

exports.UnBlockUser = function (req, res) {
    var userId = { _id: req.params.id }
    user.findByIdAndUpdate(userId, { status: true }, function (err, data) {
        if (data) res.json({ err: err, message: 'User Has Been UnBlocked!!' })
        res.json({ err: err, message: 'Error Blocking User' });
    })
}

