const VoucherModel = require('../model/VouchersModel');

// Lấy tất cả vouchers
const getAllVouchers = (req, res) => {
  VoucherModel.getAllVouchers((err, vouchers) => {
    if (err) {
        return res.status(500).json({ message: 'Error updating data', error: err });
    }
    res.status(200).json(vouchers);
  });
};

// Lấy voucher theo ID
const getVoucherById = (req, res) => {
  const VoucherID = req.params.id;
  VoucherModel.getVoucherById(VoucherID, (err, voucher) => {
    if (err) {
        return res.status(500).json({ message: 'Error updating data', error: err });
    }
    res.status(200).json(voucher);
  });
};

// Thêm voucher mới
const createVoucher = (req, res) => {
  const newVoucher = {
    Code: req.body.Code,
    DiscountAmount: req.body.DiscountAmount,
    ExpiryDate: req.body.ExpiryDate,
    MinimumPurchaseAmount: req.body.MinimumPurchaseAmount
  };

  VoucherModel.createVoucher(newVoucher, (err, insertId) => {
    if (err) {
        return res.status(500).json({ message: 'Error updating data', error: err });
    }
    res.status(201).json({ message: 'Voucher created successfully', VoucherID: insertId });
  });
};

// Cập nhật voucher
const updateVoucher = (req, res) => {
  const VoucherID = req.params.id;
  const updatedVoucher = {
    Code: req.body.Code,
    DiscountAmount: req.body.DiscountAmount,
    ExpiryDate: req.body.ExpiryDate,
    MinimumPurchaseAmount: req.body.MinimumPurchaseAmount
  };

  VoucherModel.updateVoucher(VoucherID, updatedVoucher, (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error updating data', error: err });
    }
    res.status(200).json({ message: 'Voucher updated successfully' });
  });
};

// Xóa voucher
const deleteVoucher = (req, res) => {
  const VoucherID = req.params.id;

  VoucherModel.deleteVoucher(VoucherID, (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error updating data', error: err });
    }
    res.status(200).json({ message: 'Voucher deleted successfully' });
  });
};

// Xuất các hàm
module.exports = {
  getAllVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher
};
