const CategoryRepository = require('../repositories/categoryRepository');

const addCategory = async(categories) => {
  const categoryIds = [];

  for(const categoryName of categories) {
    const category = await CategoryRepository.create({ name: categoryName })
    categoryIds.push(category.id)
  }
  
  return categoryIds;
}

const deleteCategory = async(categoryId) => {
  return await CategoryRepository.deleteById(categoryId);
}

const getCategory = async(categoryId) => {
  const category = await CategoryRepository.findById(categoryId);
  if (!category) {
    throw new Error('Category not found.')
  }
  return category;
}

const getCategoryByName = async (categoryName) => {
  return await CategoryRepository.findByName(categoryName);
};

const getAllCategories = async() => {
  return await CategoryRepository.findAll();
}

const deleteEmptyCategories = async () => {
  return await CategoryRepository.deleteEmptyCategories();
};

module.exports = {
  addCategory,
  deleteCategory,
  getCategory,
  getCategoryByName,
  getAllCategories,
  deleteEmptyCategories
}
