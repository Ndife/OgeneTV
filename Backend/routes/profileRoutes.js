var express = require('express');
var router = express.Router();
var user = require('../Models/user1');
//var userProfile = require('./authRoutes');



router.get('/:id', (req,res)=>{
    var id = {_id:req.params.id};
    user.findOne(id)
    .exec()
    .then(userData =>{
        res.send('You are Logged in as' + userData);

    })
    .catch( err =>{
        console.log('there exists and error somehere!!')
    });
})
module.exports = router;