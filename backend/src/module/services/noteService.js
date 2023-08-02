const NoteRepository = require('../repositories/noteRepository');
const CategoryService = require('../services/categoryService');

// While a controller, service and repository 
// could be programmed and used here for the junction table,
// it adds more complexity to the code for what is a relatively
// simple operation. Therefore, I only decided to
// incorporate it here to keep the backend simple.

const addNote = async (info) => {
  if (info.title === '' || info.content === '') {
    throw new Error('Cannot save a note with no title or text.');
  }
  const note = await NoteRepository.create(info);

  const categories = info.categories || [];

  for (const categoryId of categories) {
    const category = await CategoryService.getCategory(categoryId);
    if (category) {
      await NoteRepository.addNoteCategories(note.id, categoryId);
    }
  }
  return note;
};

const updateNote = async (noteId, info) => {
  const note = await NoteRepository.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }

  if (!info.title || !info.content) {
    throw new Error('Note must have a title and text');
  }

  note.title = info.title;
  note.content = info.content;

  if (info.categories) {
    const oldCategories = await NoteRepository.getCategoriesForNote(noteId);

    const newCategoryIds = info.categories;
    const categoryIdsToAdd = newCategoryIds.filter(
      (categoryId) => !oldCategories.some((cat) => cat.id === categoryId)
    );
    const categoryIdsToRemove = oldCategories
      .filter((cat) => !newCategoryIds.includes(cat.id))
      .map((cat) => cat.id);

    for (const categoryId of categoryIdsToAdd) {
      const category = await CategoryService.getCategory(categoryId);
      if (category) {
        await NoteRepository.addNoteCategories(note.id, categoryId);
      }
    }

    for (const categoryId of categoryIdsToRemove) {
      await NoteRepository.removeNoteCategories(note.id, categoryId);
    }
  }
  try {
    await NoteRepository.save(note);
    await CategoryService.deleteEmptyCategories()
  } catch(e) {
    throw new Error(e)
  }
  return note;
};

const getAllActiveNotes = async () => {
  return await NoteRepository.findAllActive();
};

const getNote = async (noteId) => {
  const note = await NoteRepository.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

const archiveNote = async (noteId) => {
  const note = await NoteRepository.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }
  note.archived = !note.archived;
  return await NoteRepository.save(note);
};

const deleteNote = async (noteId) => {
  try {
    await NoteRepository.deleteById(noteId);
    await CategoryService.deleteEmptyCategories()
    return true;
  } catch(e) {
    throw new Error(e)
  }
};

const getAllArchivedNotes = async () => {
  return await NoteRepository.findAllArchived();
};

const getCategoriesForNote = async(noteId) => {
  return await NoteRepository.getCategoriesForNote(noteId);
}

const findNotesByCategory = async (categoryName) => {
  try {
    const notes = await NoteRepository.findNotesByCategory(categoryName);
    return notes;
  } catch (e) {
    throw new Error('Error fetching notes by category:', e.message);
  }
};

module.exports = {
  addNote,
  getAllActiveNotes,
  getNote,
  updateNote,
  archiveNote,
  deleteNote,
  getAllArchivedNotes,
  getCategoriesForNote,
  findNotesByCategory
};
