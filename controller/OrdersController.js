// controllers/OrderController.js
const orderModel = require('../model/OrderModel');

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
        res.json(order);
    });
};

// Tạo mới order
const createOrder = (req, res) => {
    const orderData = req.body;
    orderModel.createOrder(orderData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating order', error: err });
        }
        res.status(201).json({ message: 'Order created', orderId: result.insertId });
    });
};

// Cập nhật order theo ID
const updateOrder = (req, res) => {
    const orderId = req.params.id;
    const orderData = req.body;
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
