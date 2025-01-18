
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req ,res, next)=>{
    const authHeader = req.headers.authorization ; 

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message : "Invalid token."
        })
    }

    const token = authHeader.split(' ')[1] ; 

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;

        if(decoded.userId){
            req.userId = decoded.userId ;
            next() ;
        }else{
            return res.status(401).json({
                message : "Unauthorized Token"
            })
        }
    }catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token."
            });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired."
            });
        } else {
            return res.status(403).json({
                message: "Something wrong happened."
            });
        }
    }
}
module.exports = {authMiddleware}