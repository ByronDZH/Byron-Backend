const Novel = require('./novelModel');

// 🟢 Create a novel for a specific user
async function createNovel(novelData, userId) {
    const novel = await Novel.create({ ...novelData, userId });
    return novel;
}

// 📖 Get all novels for a user
async function getUserNovels(userId) {
    return Novel.find({ userId }).sort({ updatedAt: -1 });
}

// 📘 Get one novel (only if it belongs to the user)
async function getUserNovelById(id, userId) {
    return Novel.findOne({ _id: id, userId });
}

// ✏️ Update novel if owned by user
async function updateUserNovel(id, userId, updateData) {
    return Novel.findOneAndUpdate(
        { _id: id, userId },
        updateData,
        { new: true }
    );
}

// ❌ Delete novel if owned by user
async function deleteUserNovel(id, userId) {
    return Novel.findOneAndDelete({ _id: id, userId });
}

module.exports = {
    createNovel,
    getUserNovels,
    getUserNovelById,
    updateUserNovel,
    deleteUserNovel
};
// This file handles the logic for creating, retrieving, updating, and deleting novels