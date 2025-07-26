const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

async function registerUser({ username, password }) {
    const existing = await User.findOne({ username });
    if (existing) {
        throw new Error('Username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword
    });

    return {
        id: user._id,
        username: user.username
    };
}

async function loginUser({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid username or password.');
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    return {
        token,
        user: {
            id: user._id,
            username: user.username
        }
    };
}

module.exports = {
    registerUser,
    loginUser
};
