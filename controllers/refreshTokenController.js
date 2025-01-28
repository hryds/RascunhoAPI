const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ where: { refreshtoken: refreshToken } });
        if (!foundUser) return res.sendStatus(403);

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                console.log(refreshToken)
                if (err || foundUser.email !== decoded.email) {
                    console.log(foundUser.email)
                    console.log(decoded.email)
                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    { "email": decoded.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );
                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.error('Error in refresh token handler:', error);
        res.sendStatus(500);
    }
};

module.exports = { handleRefreshToken };