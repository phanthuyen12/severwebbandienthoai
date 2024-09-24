const productModel = require('../model/ProductsModel');

// Lấy tất cả sản phẩm
const getAllProducts = (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving products', error: err });
        }
        res.status(200).json(products);
    });
};

// Lấy sản phẩm theo ID
const getProductById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving product', error: err });
        }
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product[0]);
    });
};

// Tạo sản phẩm mới
const createProduct = (req, res) => {
    const newProduct = req.body;
    productModel.createProduct(newProduct, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating product', error: err });
        }
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    });
};

// Xóa sản phẩm
const deleteProductById = (req, res) => {
    const productId = req.params.id;
    productModel.deleteProductById(productId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting product', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
};

// Cập nhật trạng thái sản phẩm
const updateProductStatus = (req, res) => {
    const productId = req.params.id;
    const newStatus = req.body.status;

    productModel.updateProductStatus(productId, newStatus, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating product status', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found', error: err });
        }
        res.status(200).json({ message: 'Product status updated successfully' });
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    updateProductStatus
};
