const db = require('../config/db'); // Import kết nối đến MySQL từ db.js

const productModel = {
    // Lấy tất cả sản phẩm
    getAllProducts: (callback) => {
        const query = 'SELECT * FROM product';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Lấy sản phẩm theo ProductID
    getProductById: (id, callback) => {
        const query = 'SELECT * FROM product WHERE ProductID = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Tạo sản phẩm mới
    createProduct: (newProduct, callback) => {
        const query = 'INSERT INTO product (ProductName, Description, Price, StockQuantity, CategoryID, status) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [newProduct.ProductName, newProduct.Description, newProduct.Price, newProduct.StockQuantity, newProduct.CategoryID, newProduct.status];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Xóa sản phẩm theo ProductID
    deleteProductById: (id, callback) => {
        const query = 'DELETE FROM product WHERE ProductID = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Cập nhật trạng thái (status) của sản phẩm
    updateProductStatus: (id, newStatus, callback) => {
        const query = 'UPDATE product SET status = ? WHERE ProductID = ?';
        db.query(query, [newStatus, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = productModel;
