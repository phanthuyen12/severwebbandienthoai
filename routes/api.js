var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoriesController');
const productsController = require('../controller/ProductsController');
const userController = require('../controller/UserController');
const VoucherController = require('../controller/VoucherController');
const ReviewsController = require('../controller/ReviewsController');
const provinceController = require('../controller/ProvinceController');
const districtController = require('../controller/DistrictController');
const wardsController = require('../controller/WardsController');
const addressController = require('../controller/AddressController');
const OrdersController = require('../controller/OrdersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getall-category', categoryController.getAllCategories); // Lấy tất cả categories
router.get('/get-category/:id', categoryController.getCategoryById); // Lấy category theo ID
router.post('/create-category', categoryController.createCategory); // Tạo mới category
router.post('/update-category/:id', categoryController.updateCategory); // Cập nhật category theo ID
router.delete('/delete-category/:id', categoryController.deleteCategory); // Xóa category theo ID

router.get('/products', productsController.getAllProducts);
router.get('/products/new', productsController.getProductsGetNew);
router.get('/products/:id', productsController.getProductById);
router.post('/products/creates', productsController.createProduct);
router.post('/products/delete/:id', productsController.deleteProductById);
router.post('/products/update-status/:id', productsController.updateProductStatus);

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.post('/user/login', userController.loginUser);
router.post('/user/update/:id', userController.updateUser);
router.post('/user/checkdatauser', userController.checkDataUser);
router.post('/user/update-status/:id', userController.updateUserStatus);


router.get('/vouchers', VoucherController.getAllVouchers);
router.get('/vouchers/:id', VoucherController.getVoucherById);
router.post('/vouchers', VoucherController.createVoucher);
router.post('/vouchers/update/:id', VoucherController.updateVoucher);
router.post('/vouchers/getvoucher', VoucherController.getVoucherByCode);
router.get('/vouchers/delete/:id', VoucherController.deleteVoucher);


router.get('/review', ReviewsController.getAllReviews);
router.get('/review/:id', ReviewsController.getReviewById); 
router.post('/review/add', ReviewsController.createReview); // Thêm review mới
router.post('/review/update/:id', ReviewsController.updateReview); // Cập nhật review theo ID

router.get('/location/province',provinceController.getAllProvince);
router.get('/location/district',districtController.getDistrictModelById);

router.get('/location/wards',wardsController.getWardsByID);


router.get('/address',addressController.getAllAddresses);
router.get('/address/getid',addressController.getAddressByid);
router.post('/address/add',addressController.addAddress);
router.get('/address/update',addressController.updateAddress);
router.post('/address/byuser',addressController.getAddressByUserId);
router.get('/address/delete',addressController.deleteAddress);

router.post('/order/creater',OrdersController.createOrder);






module.exports = router;
