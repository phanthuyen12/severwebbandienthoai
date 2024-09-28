// models/OrderItemModel.js
const db = require('../config/db');

// Lấy tất cả order items
const getAllOrderItems = (callback) => {
    db.query('SELECT * FROM OrderItems', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy order item theo ID
const getOrderItemById = (orderItemId, callback) => {
    db.query('SELECT * FROM OrderItems WHERE OrderItemID = ?', [orderItemId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Tạo mới order item
const createOrderItem = (orderItemData, callback) => {
    const { OrderID, ProductID, Quantity, Price } = orderItemData;
    db.query('INSERT INTO OrderItems (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)', 
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
    db.query('UPDATE OrderItems SET Quantity = ?, Price = ? WHERE OrderItemID = ?', 
    [Quantity, Price, orderItemId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xóa order item theo ID
const deleteOrderItem = (orderItemId, callback) => {
    db.query('DELETE FROM OrderItems WHERE OrderItemID = ?', [orderItemId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    getAllOrderItems,
    getOrderItemById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
};
