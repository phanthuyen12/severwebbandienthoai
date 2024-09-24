const ReviewModel = require('../model/ReviewsModel');

// Lấy tất cả reviews
const getAllReviews = (req, res) => {
  ReviewModel.getAllReviews((err, reviews) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(reviews);
  });
};

// Lấy review theo ID
const getReviewById = (req, res) => {
  const ReviewID = req.params.id;
  ReviewModel.getReviewById(ReviewID, (err, review) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(review);
  });
};

// Thêm review mới
const createReview = (req, res) => {
  const newReview = {
    UserID: req.body.UserID,
    ProductID: req.body.ProductID,
    Rating: req.body.Rating,
    Comment: req.body.Comment,
    ReviewDate: new Date() // Ngày hiện tại
  };

  ReviewModel.createReview(newReview, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Review created successfully', ReviewID: insertId });
  });
};

// Cập nhật review
const updateReview = (req, res) => {
  const ReviewID = req.params.id;
  const updatedReview = {
    Rating: req.body.Rating,
    Comment: req.body.Comment
  };

  ReviewModel.updateReview(ReviewID, updatedReview, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  });
};

// Xóa review
const deleteReview = (req, res) => {
  const ReviewID = req.params.id;

  ReviewModel.deleteReview(ReviewID, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  });
};

// Xuất các hàm
module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
