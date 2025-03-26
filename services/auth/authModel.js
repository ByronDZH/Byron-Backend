const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken');  // Import JWT for token generation

// User schema definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Store the hashed password
    createdAt: { type: Date, default: Date.now },
});

// Method to hash password before saving the user document
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);  // Hash the password before saving
    next();
});

// Method to compare the entered password with the stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token for a user
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Create the Mongoose model for User
const User = mongoose.model('User', userSchema);

module.exports = User;
