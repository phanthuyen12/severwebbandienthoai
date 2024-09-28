const db = require('../config/db'); // Import kết nối đến MySQL từ db.js

const productModel = {
    // Lấy tất cả sản phẩm
    getAllProducts: (callback) => {
        const query = `
            SELECT p.*, pi.OtherImages, c.CategoryID AS CategoryID, c.CategoryName AS CategoryName
            FROM product p
            LEFT JOIN productimage pi ON p.ProductID = pi.ProductID
            LEFT JOIN category c ON p.CategoryID  = c.CategoryID   -- Thêm JOIN với bảng category
        `;
    
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            const productsMap = {};
    
            results.forEach(row => {
                const { ProductID, ProductName, Description, Price, StockQuantity, status, ShortDescription, OtherImages, CategoryID, CategoryName,Creationtime,Priority } = row;
    
                if (!productsMap[ProductID]) {
                    productsMap[ProductID] = {
                        ProductID,
                        ProductName,
                        Description,
                        Price,
                        StockQuantity,
                        CategoryID,          // ID danh mục
                        CategoryName,        // Tên danh mục
                        status,
                        Priority,
                        Creationtime,
                        ShortDescription,
                        OtherImages: []      // Initialize as an array
                    };
                }
    
                // Push the OtherImages to the product's images array
                if (OtherImages) {
                    productsMap[ProductID].OtherImages.push(OtherImages);
                }
            });
    
            // Convert the map back to an array
            const consolidatedProducts = Object.values(productsMap);
    
            callback(null, consolidatedProducts);
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
        const query = 'INSERT INTO product (ProductName, Description, Price, StockQuantity, CategoryID, status,ShortDescription) VALUES (?, ?, ?, ?, ?, ?,?)';
        const values = [newProduct.ProductName, newProduct.Description, newProduct.Price, newProduct.StockQuantity, newProduct.CategoryID, newProduct.status,newProduct.ShortDescription];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    productImageModel : (imageData, callback) => {
        // Lưu thông tin hình ảnh vào cơ sở dữ liệu
        const sql = 'INSERT INTO productimage SET ?'; // Câu lệnh SQL để chèn hình ảnh
        db.query(sql, imageData, (err, result) => {
            if (err) return callback(err);
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
