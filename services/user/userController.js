const userLogicDB = require('./userLogicDB');

// 🔼 POST /users
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        const user = await userLogicDB.registerUser({ username, password });

        res.status(201).json({
            message: 'User registered successfully.',
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 🔑 POST /login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        const result = await userLogicDB.loginUser({ username, password });

        res.status(200).json({
            message: 'Login successful.',
            token: result.token,
            user: result.user
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
