const jwt = require('jsonwebtoken');
const secret = require('../functions/secret')
module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, secret.key);
        req.userData = decode;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'forbidden'
        });
    }

    
}   
