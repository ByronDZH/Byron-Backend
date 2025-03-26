const User = require('./authModel');  // Import the User model
const jwt = require('jsonwebtoken');  // Import JWT for token generation

// Logic to register a new user
exports.registerUser = async (userData) => {
    const { username, email, password } = userData;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('User already exists');
        const newUser = new User({ username, email, password });
        return await newUser.save();  // Save the user to the database
    } catch (error) {
        throw new Error('Registration failed: ' + error.message);
    }
};

// Logic for user login (validate credentials and generate JWT token)
exports.loginUser = async (credentials) => {
    const { email, password } = credentials;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid credentials');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid credentials');
        return user.generateAuthToken();  // Generate JWT token if credentials are correct
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

// Logic to get user profile by ID (authenticated route)
exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        return user;  // Return the user's profile data
    } catch (error) {
        throw new Error('Failed to fetch user profile: ' + error.message);
    }
};
