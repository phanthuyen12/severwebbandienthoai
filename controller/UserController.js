const userModel = require('../model/UsersModel');

// Lấy tất cả người dùng
const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving users', error: err });
        }
        res.status(200).json(users);
    });
};

// Lấy người dùng theo ID
const getUserById = (req, res) => {
    const userId = req.params.id;
    userModel.getUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving user', error: err });
        }
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user[0]);
    });
};

// Tạo người dùng mới
const createUser = (req, res) => {
    const newUser = req.body;
    userModel.createUser(newUser, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating user', error: err });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
};

// Cập nhật thông tin người dùng
const updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    console.log(req.body);
    
    userModel.updateUser(userId, updatedUser, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating user', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
};

// Cập nhật trạng thái người dùng
const updateUserStatus = (req, res) => {
    const userId = req.params.id;
    const newStatus = req.body.status;
    console.log(newStatus);

    userModel.updateUserStatus(userId, newStatus, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating user status', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User status updated successfully' });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserStatus
};
