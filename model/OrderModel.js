// models/OrderModel.js
const db = require('../config/db');

// Lấy tất cả order
const getAllorder = (callback) => {
    db.query('SELECT * FROM order', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy order theo ID
const getOrderById = (orderId, callback) => {
    db.query('SELECT * FROM order WHERE OrderID = ?', [orderId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Tạo mới order
const createOrder = (orderData, callback) => {
    const { UserID, TotalAmount, Status, PaymentStatus, VoucherID, TotalDiscount, codeorder, TimeBuy, address } = orderData;

    // Sử dụng backticks để xử lý tên bảng 'order'
    db.query('INSERT INTO `order` (UserID, OrderDate, TotalAmount, Status, PaymentStatus, VoucherID, TotalDiscount, codeorder, TimeBuy, address) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)', 
    [UserID, TotalAmount, Status || 'pending', PaymentStatus || 'unpaid', VoucherID || null, TotalDiscount || 0, codeorder, TimeBuy, address], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};


// Cập nhật order
const updateOrder = (orderId, orderData, callback) => {
    const { TotalAmount, Status, PaymentStatus, TotalDiscount, codeorder, TimeBuy, address } = orderData;
    db.query('UPDATE order SET TotalAmount = ?, Status = ?, PaymentStatus = ?, TotalDiscount = ?, codeorder = ?, TimeBuy = ?, address = ? WHERE OrderID = ?', 
    [TotalAmount, Status, PaymentStatus, TotalDiscount, codeorder, TimeBuy, address, orderId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xóa order theo ID
const deleteOrder = (orderId, callback) => {
    db.query('DELETE FROM order WHERE OrderID = ?', [orderId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    getAllorder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
