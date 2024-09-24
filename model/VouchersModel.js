const db = require('../config/db'); // Import kết nối đến MySQL từ db.js

const VoucherModel = {
  // Lấy tất cả vouchers
  getAllVouchers: (callback) => {
    const query = 'SELECT * FROM voucher';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(null, results);
    });
  },

  // Lấy voucher theo ID
  getVoucherById: (VoucherID, callback) => {
    const query = 'SELECT * FROM voucher WHERE VoucherID = ?';
    db.query(query, [VoucherID], (err, results) => {
      if (err) throw err;
      callback(null, results[0]);
    });
  },

  // Thêm voucher mới
  createVoucher: (newVoucher, callback) => {
    const query = 'INSERT INTO voucher (Code, DiscountAmount, ExpiryDate, MinimumPurchaseAmount) VALUES (?, ?, ?, ?)';
    db.query(
      query,
      [newVoucher.Code, newVoucher.DiscountAmount, newVoucher.ExpiryDate, newVoucher.MinimumPurchaseAmount],
      (err, result) => {
        if (err) throw err;
        callback(null, result.insertId);
      }
    );
  },

  // Cập nhật voucher theo ID
  updateVoucher: (VoucherID, updatedVoucher, callback) => {
    const query = 'UPDATE voucher SET Code = ?, DiscountAmount = ?, ExpiryDate = ?, MinimumPurchaseAmount = ? WHERE VoucherID = ?';
    db.query(
      query,
      [updatedVoucher.Code, updatedVoucher.DiscountAmount, updatedVoucher.ExpiryDate, updatedVoucher.MinimumPurchaseAmount, VoucherID],
      (err, result) => {
        if (err) throw err;
        callback(null, result);
      }
    );
  },

  // Xóa voucher theo ID
  deleteVoucher: (VoucherID, callback) => {
    const query = 'DELETE FROM voucher WHERE VoucherID = ?';
    db.query(query, [VoucherID], (err, result) => {
      if (err) throw err;
      callback(null, result);
    });
  }
};

module.exports = VoucherModel;
