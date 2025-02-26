const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e Senha são obrigatórios.' });
    }

    try {
        const foundUser = await User.findOne({ where: { email: email } });

        if (!foundUser) {
            return res.status(401).json({ message: 'Não autorizado: Usuário não encontrado.' });
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const accessToken = jwt.sign(
                { email: foundUser.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '12h' }
            );

            const refreshToken = jwt.sign(
                { email: foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            );
            foundUser.refreshtoken = refreshToken;
            await foundUser.save();
            const foundId = foundUser.id;

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({
                success: `Usuário ${email} logado.`,
                accessToken,
                refreshToken,
                foundId,
            });
        } else {
            res.status(401).json({ message: 'Não autorizado: senha incorreta.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Erro no servidor durante login.' });
    }
};

const verifyID = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json({ usersessionid: user.id });
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Token inválido.' });
    }
};

module.exports = { handleLogin, verifyID };