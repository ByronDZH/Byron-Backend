const { registerUser, loginUser } = require('./userLogicDB');

async function register(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        const user = await registerUser({ username, password });

        res.status(201).json({
            message: 'User registered successfully.',
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        const result = await loginUser({ username, password });

        res.status(200).json({
            message: 'Login successful.',
            token: result.token,
            user: result.user
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    register,
    login
};
