const express = require('express');
const path = require('path')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const passport = require('passport');
const ejs = require('ejs');
const keys = require('./config/key');
const cookieSession = require('express-session');



const adminRoute = require('./routes/admin');
const orderRoute = require('./routes/order');
const usersRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');

//var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const homeRoutes = require('./routes/home');


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

Mongoose.Promise = global.Promise;

Mongoose.connect('mongodb://localhost:27017/OgeneTV', { useNewUrlParser: true });

app.get('/', function(req, res){
    res.json({message:"hello world"});
});

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

//require('./auth')(passport);

app.use(passport.initialize());
app.use(passport.session());

 app.use(cookieSession({
     secret:'compare me',
     resave:false,
     saveUninitialized:false
 }));
// Cookie-Session
app.use(cookieSession({
    maxAge: 24 * 60 ^ 60 * 1000,
    keys: [keys.session.cookiekey],
    secret: keys.secret.word,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));




// routes which should handle the request

app.use('/admin',adminRoute);
app.use('/order',orderRoute);
app.use('/users',usersRoute);
app.use('/movie',moviesRoute);


//app.use('/', indexRouter);
 app.use('/users', usersRouter);
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