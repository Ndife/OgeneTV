const User = require('../models/users');
const mongoose = require('mongoose');



exports.getUsers = (req, res, next) => {
    User.find()
        .select('-__v -_id -password')
        .exec()
        .then(user => {
            if (user.length < 0) {
                res.status(401).json({
                    message: 'User field empty'
                });
            }else {
                res.status(200).json({
                    users: user
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        })
}