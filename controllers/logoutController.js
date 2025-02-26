const User = require('../models/user');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ where: { refreshtoken: refreshToken } });
        if (!foundUser) {
            console.log('Usuário não encontrado.')
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }
        foundUser.refreshtoken = null;
        console.log(foundUser.email)
        await foundUser.save();

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    } catch (error) {
        console.error('Erro ao realizar logout:', error);
        res.sendStatus(500);
    }
};

module.exports = { handleLogout };