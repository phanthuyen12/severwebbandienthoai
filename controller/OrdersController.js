// controllers/OrderController.js
const orderModel = require('../model/OrderModel');
const OrderItemModel = require('../model/OrderItemModel');
const crypto = require('crypto');
const VoucherModel = require('../model/VouchersModel');

function hashString(input) {
    // Lấy thời gian hiện tại dưới dạng chuỗi (có thể sử dụng timestamp)
    const currentTime = new Date().toISOString(); // Hoặc có thể dùng .getTime() nếu bạn chỉ muốn timestamp

    // Kết hợp chuỗi đầu vào với thời gian hiện tại
    const inputWithTime = input + currentTime;

    // Sử dụng thuật toán SHA-256 để băm chuỗi kết hợp
    const hash = crypto.createHash('sha256');
    hash.update(inputWithTime);

    // Lấy 12 ký tự đầu tiên của mã băm và trả về
    return hash.digest('hex').slice(0, 12);
}


// Lấy tất cả orders
const getAllOrders = (req, res) => {
    orderModel.getAllOrders((err, orders) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching orders', error: err });
        }
        res.json(orders);
    });
};

// Lấy order theo ID
const getOrderById = (req, res) => {
    const orderId = req.params.id;
    orderModel.getOrderById(orderId, (err, order) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching order', error: err });
        }
        if (order.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    });
};

// Tạo mới order
const createOrder = (req, res) => {
    const { UserID, TotalAmount, Status, PaymentStatus, VoucherID, TotalDiscount, address, cartItems } = req.body;
    console.log(req.body);

    // Kiểm tra các trường bắt buộc
    if (!UserID || !TotalAmount || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const va = hashString(UserID);

    const TimeBuy = new Date();
    const orderData = {
        UserID,
        TotalAmount,
        Status,
        PaymentStatus,
        VoucherID,
        TotalDiscount,
        codeorder:va,
        TimeBuy,
        address
    };

    // Tạo đơn hàng trong cơ sở dữ liệu
    orderModel.createOrder(orderData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating order', error: err });
        }
        if (VoucherID) {
            VoucherModel.incrementQuantityUsed(VoucherID, (err, incrementResult) => {
                if (err) {
                    console.error('Error incrementing quantityUsed for voucher:', err);
                    return res.status(500).json({ message: 'Error incrementing quantityUsed for voucher', error: err });
                }
                console.log('Voucher quantityUsed incremented successfully');
            });
        }
        // Nếu có cartItems, tạo các mục đơn hàng
        if (cartItems && cartItems.length > 0) {
            const orderId = result.insertId; // ID của đơn hàng vừa tạo

            // Duyệt qua từng item trong cartItems và tạo mục đơn hàng tương ứng
            let orderItemPromises = cartItems.map(item => {
                const orderItemData = {
                    OrderID: orderId,
                    ProductID: item.ProductID,
                    Price: item.Price,
                    Quantity: item.Quantity,
                    TotalPrice: item.TotalPrice
                };

                // Tạo mục đơn hàng trong cơ sở dữ liệu và trả về promise
                return new Promise((resolve, reject) => {
                    OrderItemModel.createOrderItem(orderItemData, (err, orderItemResult) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(orderItemResult);
                    });
                });
            });

            // Chờ tất cả các order items được tạo xong
            Promise.all(orderItemPromises)
                .then(() => {
                    // Trả về phản hồi thành công sau khi tạo đơn hàng và các mục đơn hàng
                    res.status(201).json({ message: 'Order created', orderId: result.insertId, status: true });
                })
                .catch(err => {
                    // Nếu có lỗi trong khi tạo order items
                    console.error('Error creating order items', err);
                    res.status(500).json({ message: 'Error creating order items', error: err, status: false });
                });
        } else {
            // Nếu không có cartItems, trả về phản hồi ngay lập tức
            res.status(201).json({ message: 'Order created', orderId: result.insertId, status: true });
        }
    });
};


// Cập nhật order theo ID
const updateOrder = (req, res) => {
    const orderId = req.params.id;
    const { TotalAmount, Status, PaymentStatus, TotalDiscount, codeorder, TimeBuy, address } = req.body;
    
    // Kiểm tra các trường cần thiết
    if (!TotalAmount || !Status || !PaymentStatus || !TotalDiscount || !codeorder || !TimeBuy || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const orderData = {
        TotalAmount,
        Status,
        PaymentStatus,
        TotalDiscount,
        codeorder,
        TimeBuy,
        address
    };

    orderModel.updateOrder(orderId, orderData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating order', error: err });
        }
        res.json({ message: 'Order updated successfully' });
    });
};

// Xóa order theo ID
const deleteOrder = (req, res) => {
    const orderId = req.params.id;
    orderModel.deleteOrder(orderId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting order', error: err });
        }
        res.json({ message: 'Order deleted successfully' });
    });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
