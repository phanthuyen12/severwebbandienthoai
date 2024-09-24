const db = require('../config/db'); // Import kết nối đến MySQL từ db.js

// Lấy tất cả category
const getAllCategories = (callback) => {
    db.query('SELECT * FROM category', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy category theo ID
const getCategoryById = (categoryId, callback) => {
    db.query('SELECT * FROM category WHERE CategoryID = ?', [categoryId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Tạo mới category
const createCategory = (categoryData, callback) => {
    const { CategoryName, Description, ImageURL } = categoryData;
    db.query('INSERT INTO category (CategoryName, Description, ImageURL) VALUES (?, ?, ?)', 
    [CategoryName, Description, ImageURL], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Cập nhật category theo ID
const updateCategory = (categoryId, categoryData, callback) => {
    const { CategoryName, Description, ImageURL } = categoryData;
    db.query('UPDATE category SET CategoryName = ?, Description = ?, ImageURL = ? WHERE CategoryID = ?', 
    [CategoryName, Description, ImageURL, categoryId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xóa category theo ID
const deleteCategory = (categoryId, callback) => {
    db.query('DELETE FROM category WHERE CategoryID = ?', [categoryId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
