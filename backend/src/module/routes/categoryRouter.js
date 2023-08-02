const CategoryController = require('../controllers/categoryController');

const router = require('express').Router();

router.post('/addCategory', CategoryController.addCategory);
router.get('/all', CategoryController.getAllCategories);

router.get('/:id', CategoryController.getCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
