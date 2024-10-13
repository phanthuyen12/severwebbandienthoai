const db = require('../config/db');

// Lấy tất cả order items
const getAllorderitem = (callback) => {
    db.query('SELECT * FROM `orderitem`', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy order item theo ID
const getOrderItemById = (orderItemId, callback) => {
    db.query('SELECT * FROM `orderitem` WHERE OrderItemID = ?', [orderItemId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Tạo mới order item
const createOrderItem = (orderItemData, callback) => {
    const { OrderID, ProductID, Quantity, Price } = orderItemData;

    // Đảm bảo câu lệnh SQL sử dụng dấu backticks cho tên bảng
    db.query('INSERT INTO `orderitem` (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)', 
    [OrderID, ProductID, Quantity, Price], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Cập nhật order item
const updateOrderItem = (orderItemId, orderItemData, callback) => {
    const { Quantity, Price } = orderItemData;

    // Đảm bảo câu lệnh SQL sử dụng dấu backticks cho tên bảng
    db.query('UPDATE `orderitem` SET Quantity = ?, Price = ? WHERE OrderItemID = ?', 
    [Quantity, Price, orderItemId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xóa order item theo ID
const deleteOrderItem = (orderItemId, callback) => {
    db.query('DELETE FROM `orderitem` WHERE OrderItemID = ?', [orderItemId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    getAllorderitem,
    getOrderItemById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
};
