const db = require('../config/db'); // Import kết nối đến MySQL từ db.js

const userModel = {
    // Lấy tất cả người dùng
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM user';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Lấy người dùng theo UserID
    getUserById: (id, callback) => {
        const query = 'SELECT * FROM user WHERE UserID = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Tạo người dùng mới
    createUser: (newUser, callback) => {
        const query = 'INSERT INTO user (Username, Password, Email, PhoneNumber, Address, Role, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [newUser.Username, newUser.Password, newUser.Email, newUser.PhoneNumber, newUser.Address, newUser.Role, newUser.status];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Cập nhật thông tin người dùng
    updateUser: (id, updatedUser, callback) => {
        const query = 'UPDATE user SET Username = ?, Password = ?, Email = ?, PhoneNumber = ?, Address = ?, Role = ? WHERE UserID = ?';
        const values = [updatedUser.Username, updatedUser.Password, updatedUser.Email, updatedUser.PhoneNumber, updatedUser.Address, updatedUser.Role, id];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Cập nhật trạng thái người dùng
    updateUserStatus: (id, newStatus, callback) => {
        const query = 'UPDATE user SET status = ? WHERE UserID = ?';
        db.query(query, [newStatus, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = userModel;
