require('dotenv').config();
var createError = require('http-errors');


let checkToken = (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token?.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        if (token===process.env.SECRET){
            next();
        } else {
            return res.status(403).send(createError(403))
        }
        
    } else {
        return res.json({
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}