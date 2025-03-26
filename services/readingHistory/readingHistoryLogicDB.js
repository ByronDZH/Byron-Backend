const ReadingHistory = require('./readingHistoryModel');  // Import the Mongoose model

// Logic to get all reading histories from the database
exports.getAllReadingHistory = async () => {
    try {
        return await ReadingHistory.find();  // Retrieve all reading histories
    } catch (error) {
        throw new Error('Failed to get reading histories: ' + error.message);
    }
};

// Logic to add a new reading history in the database
exports.addReadingHistory = async (historyData) => {
    const history = new ReadingHistory(historyData);
    try {
        return await history.save();  // Save the new reading history to the database
    } catch (error) {
        throw new Error('Failed to add reading history: ' + error.message);
    }
};

// Logic to get a single reading history by ID from the database
exports.getReadingHistoryById = async (id) => {
    try {
        return await ReadingHistory.findById(id);  // Find reading history by its ID
    } catch (error) {
        throw new Error('Failed to get reading history: ' + error.message);
    }
};

// Logic to update a reading history in the database
exports.updateReadingHistory = async (id, updateData) => {
    try {
        return await ReadingHistory.findByIdAndUpdate(id, updateData, { new: true });  // Update the reading history
    } catch (error) {
        throw new Error('Failed to update reading history: ' + error.message);
    }
};

// Logic to delete a reading history from the database
exports.deleteReadingHistory = async (id) => {
    try {
        return await ReadingHistory.findByIdAndDelete(id);  // Delete the reading history by its ID
    } catch (error) {
        throw new Error('Failed to delete reading history: ' + error.message);
    }
};
