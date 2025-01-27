const User = require('../models/user');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const foundUser = await User.findOne({ where: { email: email } });

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized: User not found.' });
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // Criar JWT 
            res.json({ success: `User ${email} is logged in!` });
        } else {
            res.status(401).json({ message: 'Unauthorized: Incorrect password.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

module.exports = { handleLogin };