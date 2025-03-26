const authLogicDB = require('./authLogicDB');  // Import the logic for authentication

// Controller for registering a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await authLogicDB.registerUser({ username, email, password });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
};

// Controller for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authLogicDB.loginUser({ email, password });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ message: 'Login failed', error: error.message });
    }
};

// Controller for getting the current user profile (authenticated)
exports.getProfile = async (req, res) => {
    try {
        const user = await authLogicDB.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
    }
};
