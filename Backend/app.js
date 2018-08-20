const express = require('express');
const path = require('path')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const keys = require('./config/key');

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

const adminRoute = require('./routes/admin');
const orderRoute = require('./routes/order');
const usersRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');

//var indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const homeRoutes = require('./routes/home');


app.use(morgan('dev'));
app.use('/files', express.static('files'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

Mongoose.Promise = global.Promise;
  
Mongoose.connect('mongodb://Admin:ndife123@ds215502.mlab.com:15502/ogenetv' ,{ useNewUrlParser: true });

// Mongoose.connect('mongodb://localhost:27017/OgeneTV', { useNewUrlParser: true });

app.get('/', function(req, res){
    res.json({message:"hello world"});
});

app.use(express.static(path.join(__dirname, 'public')));




// routes which should handle the request

app.use('/admin',adminRoute);
app.use('/order',orderRoute);
app.use('/users',usersRoute);
app.use('/movies',moviesRoute);



//app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/',homeRoutes);
app.use('/profile', profileRoutes)




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