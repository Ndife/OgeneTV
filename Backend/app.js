const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var Mongoose = require('mongoose');

const adminRoute = require('./routes/admin');
const orderRoute = require('./routes/order');
const usersRoute = require('./routes/users');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/OgeneTV');

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept, Authorization");


if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,GET');
    return res.status(200).json({});;
}
next();
});

// routes which should handle the request
app.use('/admin',adminRoute);
app.use('/order',orderRoute);
app.use('/users',usersRoute);

app.use((req, res, next)=>{
   const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});


module.exports = app;