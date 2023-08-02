const CategoryService = require('../services/categoryService');

const addCategory = async(req, res) => {
  let info = {
    name: req.body.category
  };
  try {
    const category = await CategoryService.addCategory(info);
    res.status(200).send(category);
  } catch(e) {
    res.status(500).send({ message: 'Error adding new category:', error: e.message})
  }
};

const deleteCategory = async(req, res) => {
  const categoryId = req.params.id;
  try {
    await CategoryService.deleteCategory(categoryId);
    req.status(200).send('Category deleted succesfully.')
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

const getAllCategories = async(req, res) => {
  try {
    let categories = await CategoryService.getAllCategories();
    req.status(200).send(categories);
  } catch(e) {
    res.status(500).send({ message: 'Error retrieving categories:', error: e.message });
  }
}

module.exports = {
  addCategory,
  deleteCategory,
  getCategory,
  getAllCategories
}
