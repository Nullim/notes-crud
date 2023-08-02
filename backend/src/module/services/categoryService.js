const CategoryRepository = require('../repositories/categoryRepository');

const addCategory = async(info) => {
  if (info.category = '') {
    throw new Error('Cannot add an empty category.')
  }
  return await CategoryRepository.create(info);
}

const deleteCategory = async(categoryId) => {
  return await CategoryRepository.deleteById(categoryId);
}

const getCategory = async(categoryId) => {
  const category = await CategoryRepository.findById(categoryId);
  if (!category) {
    throw new Error('Category not found.')
  }
}

const getAllCategories = async() => {
  return await CategoryRepository.findAll();
}

module.exports = {
  addCategory,
  deleteCategory,
  getCategory,
  getAllCategories
}
