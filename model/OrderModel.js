// models/OrderModel.js
const db = require('../config/db');

// Lấy tất cả orders
const getAllOrders = (callback) => {
    db.query('SELECT * FROM Orders', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy order theo ID
const getOrderById = (orderId, callback) => {
    db.query('SELECT * FROM Orders WHERE OrderID = ?', [orderId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Tạo mới order
const createOrder = (orderData, callback) => {
    const { UserID, TotalAmount, Status, PaymentStatus, VoucherID } = orderData;
    db.query('INSERT INTO Orders (UserID, OrderDate, TotalAmount, Status, PaymentStatus, VoucherID) VALUES (?, NOW(), ?, ?, ?, ?)', 
    [UserID, TotalAmount, Status || 'pending', PaymentStatus || 'unpaid', VoucherID || null], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Cập nhật order
const updateOrder = (orderId, orderData, callback) => {
    const { TotalAmount, Status, PaymentStatus } = orderData;
    db.query('UPDATE Orders SET TotalAmount = ?, Status = ?, PaymentStatus = ? WHERE OrderID = ?', 
    [TotalAmount, Status, PaymentStatus, orderId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xóa order theo ID
const deleteOrder = (orderId, callback) => {
    db.query('DELETE FROM Orders WHERE OrderID = ?', [orderId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
