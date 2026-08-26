const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const adminRoutes = express.Router();
const adminController = require('../controller/admin');



adminRoutes.get('/add-product', adminController.getAddProduct);

adminRoutes.post('/add-product', adminController.postAddProduct);


adminRoutes.get('/products', adminController.getProducts);

adminRoutes.get('/edit-product/:productId', adminController.getEditProduct);


module.exports = adminRoutes;

