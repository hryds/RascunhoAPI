const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    console.log(token);
    console.log(process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.name;
            next();
        }
    );
}

module.exports = verifyJWT