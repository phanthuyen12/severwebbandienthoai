const categoryModel = require('../model/CategoriesModel');

// Lấy tất cả categories
const getAllCategories = (req, res) => {
    categoryModel.getAllCategories((err, categories) => {
        if (err) {
            res.status(500).json({ message: 'Error creating category', error: err });
        }
        res.json(categories);
    });
};

// Lấy category theo ID
const getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    categoryModel.getCategoryById(categoryId, (err, category) => {
        if (err) {
            res.status(500).json({ message: 'Error creating category', error: err });
        }
        res.json(category);
    });
};

// Tạo mới category
const createCategory = (req, res) => {
    const categoryData = req.body;
    categoryModel.createCategory(categoryData, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error creating category', error: err });
        }
        res.status(201).json({ message: 'Category created', categoryId: result.insertId });
    });
};

// Cập nhật category theo ID
const updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const categoryData = req.body;
    categoryModel.updateCategory(categoryId, categoryData, (err, result) => {
        if (err) {
            return res.status(500).send('Error updating category');
        }
        res.json({ message: 'Category updated' });
    });
};

// Xóa category theo ID
const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    categoryModel.deleteCategory(categoryId, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error creating category', error: err });
        }
        res.json({ message: 'Category deleted' });
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
