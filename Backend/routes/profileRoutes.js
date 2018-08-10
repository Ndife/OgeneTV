var express = require('express');
var router = express.Router();
var user = require('../models/user1');



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

// router.get('/', (req, res) => {
//     res.send('You have reached here ' + req.user);
// })
module.exports = router;