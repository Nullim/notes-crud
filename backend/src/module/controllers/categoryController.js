const CategoryService = require('../services/categoryService');

const addCategory = async(req, res) => {
  const { categories } = req.body
  if (!categories || categories.length === 0) {
    return res.status(200).send('No categories provided.');
  }
  try {
    const categoryIds = await CategoryService.addCategory(categories);
    res.status(200).send(categoryIds);
  } catch(e) {
    res.status(500).send({ message: 'Error adding new category:', error: e.message})
  }
};

const deleteCategory = async(req, res) => {
  const categoryId = req.params.id;
  try {
    await CategoryService.deleteCategory(categoryId);
    res.status(200).send('Category deleted succesfully.')
  } catch(e) {
    res.status(500).send({ message: 'Error deleting category:', error: e.message });
  }
}

const getCategory = async(req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await CategoryService.getCategory(categoryId);
    res.status(200).send(category);
  } catch(e) {
    res.status(500).send({ message: 'Error retrieving category:', error: e.message });
  }
}

const getCategoryByName = async (req, res) => {
  const categoryName = req.params.name;
  try {
    const category = await CategoryService.getCategoryByName(categoryName);
    res.status(200).send(category);
  } catch (e) {
    res.status(500).send({ message: "Error retrieving category:", error: e.message });
  }
};

const getAllCategories = async(req, res) => {
  try {
    let categories = await CategoryService.getAllCategories();
    res.status(200).send(categories);
  } catch(e) {
    res.status(500).send({ message: 'Error retrieving categories:', error: e.message });
  }
}

module.exports = {
  addCategory,
  deleteCategory,
  getCategory,
  getCategoryByName,
  getAllCategories
}
