const novelLogicDB = require('./novelLogicDB');  // ✅ Import entire module as one object

// 🔼 POST /novels
exports.createNovel = async (req, res) => {
  try {
    const novel = await novelLogicDB.createNovel(req.body, req.user.id);
    res.status(201).json(novel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create novel', details: err.message });
  }
};

// 📄 GET /novels
exports.getAllNovels = async (req, res) => {
  try {
    const novels = await novelLogicDB.getUserNovels(req.user.id);
    res.json(novels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch novels', details: err.message });
  }
};

// 📘 GET /novels/:id
exports.getNovelById = async (req, res) => {
  try {
    const novel = await novelLogicDB.getUserNovelById(req.params.id, req.user.id);
    if (!novel) return res.status(404).json({ error: 'Novel not found' });
    res.json(novel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch novel', details: err.message });
  }
};

// ✏️ PUT /novels/:id
exports.updateNovel = async (req, res) => {
  try {
    const updated = await novelLogicDB.updateUserNovel(req.params.id, req.user.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Novel not found or unauthorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update novel', details: err.message });
  }
};

// ❌ DELETE /novels/:id
exports.deleteNovel = async (req, res) => {
  try {
    const deleted = await novelLogicDB.deleteUserNovel(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ error: 'Novel not found or unauthorized' });
    res.json({ message: 'Novel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete novel', details: err.message });
  }
};

