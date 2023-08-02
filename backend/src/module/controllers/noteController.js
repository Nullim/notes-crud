const NoteService = require('../services/noteService');

const addNote = async (req, res) => {
  let info = {
    title: req.body.title,
    content: req.body.content,
    archived: req.body.archived,
    categories: req.body.categories
  };
  try {
    const note = await NoteService.addNote(info);
    res.status(200).send(note);
  } catch (e) {
    res.status(500).send({ message: 'Error adding new note:', error: e.message });
  }
};

const getAllActiveNotes = async (req, res) => {
  try {
    let notes = await NoteService.getAllActiveNotes();
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).send({ message: 'Error retrieving active notes:', error: e.message });
  }
};

const getNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await NoteService.getNote(noteId);
    res.status(200).send(note);
  } catch (e) {
    res.status(500).send({ message: 'Error retrieving note:', error: e.message });
  }
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  let info = {
    title: req.body.title,
    content: req.body.content,
    categories: req.body.categories
  };
  try {
    const note = await NoteService.updateNote(noteId, info);
    res.status(200).send(note);
  } catch (e) {
    res.status(500).send({ message: 'Error updating note:', error: e.message });
  }
};

const archiveNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    await NoteService.archiveNote(noteId);
    res.status(200).send({ message: 'Note archived successfully!' });
  } catch (e) {
    res.status(500).send({ message: 'Error archiving note:', error: e.message });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    await NoteService.deleteNote(noteId);
    res.status(200).send('Note deleted successfully.');
  } catch (e) {
    res.status(500).send({ message: 'Error deleting note', error: e.message });
  }
};

const getAllArchivedNotes = async (req, res) => {
  try {
    let notes = await NoteService.getAllArchivedNotes();
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).send({ message: 'Error retrieving archived notes', error: e.message });
  }
};

const getCategoriesForNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const categories = await NoteService.getCategoriesForNote(noteId);
    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send({ message: 'Error retrieving categories for note:', error: e.message });
  }
};

const getNotesByCategory = async (req, res) => {
  const categoryName = req.params.categoryName;
  try {
    const notes = await NoteService.findNotesByCategory(categoryName);
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).send({ message: 'Error retrieving notes by category:', error: e.message });
  }
};

module.exports = {
  addNote,
  updateNote,
  getNote,
  archiveNote,
  deleteNote,
  getAllActiveNotes,
  getAllArchivedNotes,
  getCategoriesForNote,
  getNotesByCategory
};
