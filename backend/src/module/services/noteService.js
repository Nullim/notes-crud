const NoteRepository = require('../repositories/noteRepository');

const addNote = async (info) => {
  if (info.title === '' || info.content === '') {
    throw new Error('Cannot save a note with no title or text.');
  }
  return await NoteRepository.create(info);
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

const updateNote = async (noteId, info) => {
  const note = await NoteRepository.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  } else if (info.title === '' || info.content === '') {
    throw new Error('Note must have a title and text');
  }
  note.title = info.title;
  note.content = info.content;
  return await NoteRepository.save(note);
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
  return await NoteRepository.deleteById(noteId);
};

const getAllArchivedNotes = async () => {
  return await NoteRepository.findAllArchived();
};

module.exports = {
  addNote,
  getAllActiveNotes,
  getNote,
  updateNote,
  archiveNote,
  deleteNote,
  getAllArchivedNotes,
};
