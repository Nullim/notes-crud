const db = require('../models/categoryModel');
const Category = db.categories;

const create = async(info) => {
  return await Category.create(info);
}

const deleteById = async(categoryId) => {
  return await Category.destroy({
    where: {
      id: categoryId
    }
  })
}

const findAll = async() => {
  return await Category.findAll()
}

const findById = async(categoryId) => {
  return await Category.findByPk(categoryId)
}

module.exports = {
  create,
  deleteById,
  findAll,
  findById
}
