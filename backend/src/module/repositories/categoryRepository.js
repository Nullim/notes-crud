const db = require('../models');
const { Op } = require('sequelize');
const Category = db.categories;
const Note = db.notes;

const create = async (info) => {
  return await Category.create(info);
};

const deleteById = async(categoryId) => {
  return await Category.destroy({
    where: {
      id: categoryId
    }
  })
}

const findAll = async() => {
  return await Category.findAll();
}

const findById = async(categoryId) => {
  return await Category.findByPk(categoryId)
}

const findByName = async (categoryName) => {
  return await Category.findOne({
    where: {
      name: categoryName,
    },
  });
};

const deleteEmptyCategories = async () => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Note,
          attributes: [],
        },
      ],
      where: {
        '$Notes.id$': { [Op.eq]: null }
      },
    });
    for (const category of categories) {
      await Category.destroy({
        where: { id: category.id },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  create,
  deleteById,
  findAll,
  findById,
  findByName,
  deleteEmptyCategories
}
