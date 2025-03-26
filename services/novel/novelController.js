const novelLogicDB = require('./novelLogicDB');  // Import database logic

// Controller for getting all novels
exports.getAllNovels = async (req, res) => {
    try {
        const novels = await novelLogicDB.getAllNovels();
        res.status(200).json(novels);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve novels', error: error.message });
    }
};

// Controller for creating a new novel
exports.createNovel = async (req, res) => {
    const { title, author, totalChapters, url, genre, originalLanguage } = req.body;
    try {
        const newNovel = await novelLogicDB.createNovel({
            title,
            author,
            totalChapters,
            url,
            genre,
            originalLanguage,
        });
        res.status(201).json(newNovel);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create novel', error: error.message });
    }
};

// Controller for getting a single novel by ID
exports.getNovelById = async (req, res) => {
    const { id } = req.params;
    try {
        const novel = await novelLogicDB.getNovelById(id);
        if (novel) {
            res.status(200).json(novel);
        } else {
            res.status(404).json({ message: 'Novel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve novel', error: error.message });
    }
};

// Controller for updating a novel
exports.updateNovel = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedNovel = await novelLogicDB.updateNovel(id, updateData);
        if (updatedNovel) {
            res.status(200).json(updatedNovel);
        } else {
            res.status(404).json({ message: 'Novel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update novel', error: error.message });
    }
};

// Controller for deleting a novel
exports.deleteNovel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNovel = await novelLogicDB.deleteNovel(id);
        if (deletedNovel) {
            res.status(200).json({ message: 'Novel deleted successfully' });
        } else {
            res.status(404).json({ message: 'Novel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete novel', error: error.message });
    }
};
