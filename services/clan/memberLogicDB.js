// /services/guild/memberLogicDB.js
const Member = require('./memberModel');

// Get all members
exports.getAllMembers = async () => {
    try {
        return await Member.find();
    } catch (error) {
        throw new Error('Failed to get members: ' + error.message);
    }
};

// Create a new member
exports.createMember = async (memberData) => {
    const member = new Member(memberData);
    try {
        return await member.save();
    } catch (error) {
        throw new Error('Failed to create member: ' + error.message);
    }
};

// Get member by ID
exports.getMemberById = async (id) => {
    try {
        return await Member.findById(id);
    } catch (error) {
        throw new Error('Failed to get member: ' + error.message);
    }
};

// Update member
exports.updateMember = async (id, updateData) => {
    try {
        return await Member.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Failed to update member: ' + error.message);
    }
};

// Delete member
exports.deleteMember = async (id) => {
    try {
        return await Member.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Failed to delete member: ' + error.message);
    }
};
