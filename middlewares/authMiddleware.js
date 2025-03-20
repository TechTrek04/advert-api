import jwt from "jsonwebtoken"

export const isAuthenticated = (req, res, next) => {
    // get authorization header
    const authorization = req.headers.authorization;
    // check the presence of authoriztion
    if (!authorization) {
        return res.status(401).json('Authorization header does not exist!');
    }
    // get access token from authorization 
    const token = authorization.split(' ')[1];
    // check if token exists
    if (!token) {
        return res.status(401).json('Access token not provided!')
    }
    // verify and decode the access token
    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (error, decoded) => {
            // handle verified error
            if (error) {
                return res.status(401).json(error);
            }
            // add decoded to request object
    req.user = decoded;
    // proceed to next handler
    next();
        }
    );
    
}