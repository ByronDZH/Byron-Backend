const readingHistoryLogicDB = require('./readingHistoryLogicDB');  // Import database logic

// Controller for getting all reading histories
exports.getAllReadingHistories = async (req, res) => {
    try {
        const histories = await readingHistoryLogicDB.getAllReadingHistories();
        res.status(200).json(histories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reading histories', error: error.message });
    }
};

// Controller for adding a new reading history
exports.addReadingHistory = async (req, res) => {
    const { startDate, endDate, chaptersRead, status, comment } = req.body;
    try {
        const newHistory = await readingHistoryLogicDB.addReadingHistory({
            startDate,
            endDate,
            chaptersRead,
            status,
            comment
        });
        res.status(201).json(newHistory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add reading history', error: error.message });
    }
};

// Controller for getting a single reading history by ID
exports.getReadingHistoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const history = await readingHistoryLogicDB.getReadingHistoryById(id);
        if (history) {
            res.status(200).json(history);
        } else {
            res.status(404).json({ message: 'Reading history not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reading history', error: error.message });
    }
};

// Controller for updating a reading history
exports.updateReadingHistory = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedHistory = await readingHistoryLogicDB.updateReadingHistory(id, updateData);
        if (updatedHistory) {
            res.status(200).json(updatedHistory);
        } else {
            res.status(404).json({ message: 'Reading history not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update reading history', error: error.message });
    }
};

// Controller for deleting a reading history
exports.deleteReadingHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHistory = await readingHistoryLogicDB.deleteReadingHistory(id);
        if (deletedHistory) {
            res.status(200).json({ message: 'Reading history deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reading history not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete reading history', error: error.message });
    }
};
