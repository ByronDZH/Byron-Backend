// /services/guild/memberController.js
const memberLogicDB = require('./memberLogicDB');

// Get all members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await memberLogicDB.getAllMembers();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve members', error: error.message });
    }
};

// Create a new member
exports.createMember = async (req, res) => {
    const { name, rank, joinDate, status, notes } = req.body;
    try {
        const newMember = await memberLogicDB.createMember({
            name,
            rank,
            joinDate,
            status,
            notes
        });
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create member', error: error.message });
    }
};

// Get a single member by ID
exports.getMemberById = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await memberLogicDB.getMemberById(id);
        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve member', error: error.message });
    }
};

// Update a member
exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedMember = await memberLogicDB.updateMember(id, updateData);
        if (updatedMember) {
            res.status(200).json(updatedMember);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update member', error: error.message });
    }
};

// Delete a member
exports.deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMember = await memberLogicDB.deleteMember(id);
        if (deletedMember) {
            res.status(200).json({ message: 'Member deleted successfully' });
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete member', error: error.message });
    }
};
