const jwt = require('jsonwebtoken');
const secret = require('../functions/secret')
module.exports.user = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, secret.userKey);
        req.userData = decode;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'forbidden'
        });
    }

    
}   


module.exports.admin = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, secret.adminKey);
        req.userData = decode;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'forbidden'
        });
    }

    
}   
