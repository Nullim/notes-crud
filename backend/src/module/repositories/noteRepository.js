const db = require('../models');
const Note = db.notes;
const Category = db.categories;
const NoteCategory = db.note_categories;

const create = async (info) => {
  return await Note.create(info);
};

const addNoteCategories = async (noteId, categoryId) => {
  return await NoteCategory.create({
    noteId,
    categoryId
  })
}

const removeNoteCategories = async (noteId, categoryId) => {
  return await NoteCategory.destroy({
    where: { noteId, categoryId },
  });
};

const findAllActive = async () => {
  return await Note.findAll({
    where: {
      archived: false,
    },
  });
};

const findById = async (noteId) => {
  return await Note.findByPk(noteId, {
    include: [Category]
  });
};

const save = async (note) => {
  return await note.save();
};

const deleteById = async (noteId) => {
  return await Note.destroy({
    where: { id: noteId },
  });
};

const findAllArchived = async () => {
  return await Note.findAll({
    where: {
      archived: true,
    },
  });
};

const getCategoriesForNote = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId, {
      include: [Category],
    });
    return note.categories;
  } catch (e) {
    throw new Error(e.message);
  }
};

const findNotesByCategory = async (categoryName) => {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: Category,
          where: {
            name: categoryName,
          },
        },
      ],
      where: {
        archived: false
      }
    });
    return notes;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  create,
  addNoteCategories,
  removeNoteCategories,
  getCategoriesForNote,
  findNotesByCategory,
  findAllActive,
  findById,
  save,
  deleteById,
  findAllArchived
};
