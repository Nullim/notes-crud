const db = require('../models');
const Note = db.notes;

const create = async (info) => {
  return await Note.create(info);
};

const findAllActive = async () => {
  return await Note.findAll({
    where: {
      archived: false,
    },
  });
};

const findById = async (noteId) => {
  return await Note.findByPk(noteId);
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

module.exports = {
  create,
  findAllActive,
  findById,
  save,
  deleteById,
  findAllArchived,
};
