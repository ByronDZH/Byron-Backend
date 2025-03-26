const Novel = require('./novelModel');  // Import the Mongoose model

// Logic to get all novels from the database
exports.getAllNovels = async () => {
    try {
        return await Novel.find();  // Retrieve all novels
    } catch (error) {
        throw new Error('Failed to get novels: ' + error.message);
    }
};

// Logic to create a new novel in the database
exports.createNovel = async (novelData) => {
    const novel = new Novel(novelData);
    try {
        return await novel.save();  // Save the new novel to the database
    } catch (error) {
        throw new Error('Failed to create novel: ' + error.message);
    }
};

// Logic to get a single novel by ID from the database
exports.getNovelById = async (id) => {
    try {
        return await Novel.findById(id);  // Find novel by its ID
    } catch (error) {
        throw new Error('Failed to get novel: ' + error.message);
    }
};

// Logic to update a novel in the database
exports.updateNovel = async (id, updateData) => {
    try {
        return await Novel.findByIdAndUpdate(id, updateData, { new: true });  // Update the novel and return the updated document
    } catch (error) {
        throw new Error('Failed to update novel: ' + error.message);
    }
};

// Logic to delete a novel from the database
exports.deleteNovel = async (id) => {
    try {
        return await Novel.findByIdAndDelete(id);  // Delete the novel by its ID
    } catch (error) {
        throw new Error('Failed to delete novel: ' + error.message);
    }
};
