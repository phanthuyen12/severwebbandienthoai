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
    findUserByEmailAndToken: (email, tokenuser, callback) => {
        const query = 'SELECT * FROM user WHERE email = ? AND tokenuser = ?';
        db.query(query, [email, tokenuser], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            // Kiểm tra nếu người dùng được tìm thấy
            if (results.length > 0) {
                callback(null, results[0]); // Trả về người dùng đầu tiên
            } else {
                callback(null, null); // Không tìm thấy người dùng
            }
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
        const query = 'INSERT INTO user (Username, Password, Email, PhoneNumber, Address, Role, status, tokenuser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [newUser.Username, newUser.Password, newUser.Email, newUser.PhoneNumber, newUser.Address, newUser.Role, newUser.status, newUser.tokenuser];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    
    // Model để tìm kiếm người dùng theo email
findUserByEmail: (email, callback) => {
    const query = 'SELECT * FROM user WHERE Email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Trả về người dùng đầu tiên (nếu có)
        callback(null, results.length > 0 ? results[0] : null);
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
