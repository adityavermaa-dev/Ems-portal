const {verifyToken} = require("../utils/jwt");

function authMiddleware(req,res,next){
    try {
        const token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({message:"Authentication Required"});
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid Token"});
    }

}

module.exports = authMiddleware;


/**
 * In next version i have also have to verify the role and the status
 * of the user from the database as the jwt can have the old role stored
 * so querying it from the database give the correct role which improves our security.
 */