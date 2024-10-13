const userModel = require('../model/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    // Mã hóa mật khẩu
    bcrypt.hash(newUser.Password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password', error: err });
        }

        // Cập nhật mật khẩu mã hóa vào đối tượng người dùng
        newUser.Password = hashedPassword;

        // Tạo tokenuser bằng cách băm Username
        const crypto = require('crypto');
        newUser.tokenuser = crypto.createHash('sha256').update(newUser.Username).digest('hex');
        console.log( newUser.tokenuser);
        // Tạo người dùng mới với tokenuser
        userModel.createUser(newUser, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating user', error: err });
            }
            res.status(201).json({ message: 'User created successfully', userId: result.insertId });
        });
    });
};
const checkDataUser = (req,res)=>{
    const {email, tokenuser} = req.body;
    userModel.findUserByEmailAndToken(email,tokenuser,(err,user)=>{
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Trả về thông tin người dùng nếu tìm thấy
        res.status(200).json({status:true , message: 'Người Dùng Hợp Lệ', user });
    });
}
const loginUser = (req, res) => {
    const { Email, Password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu
    userModel.findUserByEmail(Email, (err, user) => {
        if (err || !user) {
            return res.status(401).json({status:false , message: 'Không có thông tin' });
        }

        // So sánh mật khẩu
        bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({status:false , message: 'Sai Mật Khẩu' });
            }

            // Tạo token
            const token = jwt.sign(
                { userId: user.UserID , email: user.Email,tokenuser: user.tokenuser ,Role:user.Role}, // payload
                'f41f956113567cab67efe66b3c4a41c92af08c4f30f61befcd400773a0cb62d52ca28506fd75124432da68b00064352c335c39066c7bd81b257bb6a137e783c2', // secret key, nên lưu trong biến môi trường
                { expiresIn: '1h' } // thời gian hết hạn của token
            );

            // Mật khẩu đúng, trả về token
            res.status(200).json({status:true , message: 'Đăng Nhập Thành Công', token });
        });
    });
};
// Lấy địa chỉ theo UserID
const getAddressByUserId = (req, res) => {
    const userId = req.query.userId;  // Assuming you're passing UserID via query parameters
    if (!userId) {
        return res.status(400).json({ message: 'UserID is required' });
    }

    AddressModel.getAddressesByUserId(userId, (err, addresses) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching addresses for user', error: err });
        }
        if (addresses.length === 0) {
            return res.status(404).json({ message: 'No addresses found for this user' });
        }
        res.json(addresses);
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
    updateUserStatus,
    loginUser,
    checkDataUser,
    getAddressByUserId
};
