const db = require('../config/db'); // Giả sử bạn đã có file kết nối với MySQL

const ReviewsModel = {
  getAllReviews: (callback) => {
    db.query('SELECT * FROM reviews', callback);
  },

  getReviewById: (id, callback) => {
    db.query('SELECT * FROM reviews WHERE ReviewID = ?', [id], callback);
  },

  createReview: (newReview, callback) => {
    db.query('INSERT INTO reviews SET ?', newReview, callback);
  },

  updateReview: (id, updatedReview, callback) => {
    db.query('UPDATE reviews SET ? WHERE ReviewID = ?', [updatedReview, id], callback);
  },

  deleteReview: (id, callback) => {
    db.query('DELETE FROM reviews WHERE ReviewID = ?', [id], callback);
  }
};

module.exports = ReviewsModel;
