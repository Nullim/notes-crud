const db = require('../models');

const NoteCategoryService = {
  async addNoteCategory(noteId, categoryId) {
    try {
      const noteCategory = await db.note_categories.create({
        noteId,
        categoryId,
      });
      return noteCategory;
    } catch (e) {
      throw new Error('Error adding note category');
    }
  },
};

module.exports = NoteCategoryService;
