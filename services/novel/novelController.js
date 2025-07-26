const {
  createNovel,
  getUserNovels,
  getUserNovelById,
  updateUserNovel,
  deleteUserNovel
} = require('./novelLogicDB');

// 🔼 POST /novels
async function createNovel(req, res) {
  try {
    const novel = await createNovel(req.body, req.user.id);
    res.status(201).json(novel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create novel', details: err.message });
  }
}

// 📄 GET /novels
async function getAllNovels(req, res) {
  try {
    const novels = await getUserNovels(req.user.id);
    res.json(novels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch novels', details: err.message });
  }
}

// 📘 GET /novels/:id
async function getNovelById(req, res) {
  try {
    const novel = await getUserNovelById(req.params.id, req.user.id);
    if (!novel) return res.status(404).json({ error: 'Novel not found' });
    res.json(novel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch novel', details: err.message });
  }
}

// ✏️ PUT /novels/:id
async function updateNovel(req, res) {
  try {
    const updated = await updateUserNovel(req.params.id, req.user.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Novel not found or unauthorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update novel', details: err.message });
  }
}

// ❌ DELETE /novels/:id
async function deleteNovel(req, res) {
  try {
    const deleted = await deleteUserNovel(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ error: 'Novel not found or unauthorized' });
    res.json({ message: 'Novel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete novel', details: err.message });
  }
}

module.exports = {
  createNovel,
  getAllNovels,
  getNovelById,
  updateNovel,
  deleteNovel
};
// services/novel/novelController.js