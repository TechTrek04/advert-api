// import jwt from "jsonwebtoken"
import { expressjwt } from "express-jwt";
import { UserModel } from "../models/authModel.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});


//authorization
export const isAuthorized = (roles) => {
    return async (req, res, next) => {
        try{
            const user = await UserModel.findById(req.auth.id);
            if(!user) {
                return res.status(404).json('User not found');
            }

            if(!roles.includes(user.role)) {
                return res.status(403).json('You are not authorized')
            }
            next();
        } catch(error) {
            console.error('Authorization error:', error);
            res.status(500).json('Authorization error')
        }
    };
};





// export const isAuthenticated = (req, res, next) => {
//     // get authorization header
//     const authorization = req.headers.authorization;
//     // check the presence of authoriztion
//     if (!authorization) {
//         return res.status(401).json('Authorization header does not exist!');
//     }
//     // get access token from authorization 
//     const token = authorization.split(' ')[1];
//     // check if token exists
//     if (!token) {
//         return res.status(401).json('Access token not provided!')
//     }
//     // verify and decode the access token
//     jwt.verify(
//         token,
//         process.env.JWT_SECRET_KEY,
//         (error, decoded) => {
//             // handle verified error
//             if (error) {
//                 return res.status(401).json(error);
//             }
//             // add decoded to request object
//     req.user = decoded;
//     // proceed to next handler
//     next();
//         }
//     );
    
// }