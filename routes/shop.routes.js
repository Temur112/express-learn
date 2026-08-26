const express = require('express');
const path = require('path');


const shopRoutes = express.Router();

const shopController = require('../controller/shop');

shopRoutes.get('/', shopController.getIndex);

shopRoutes.get('/products', shopController.getProducts);

shopRoutes.get('/products/:productId', shopController.getProduct);

shopRoutes.get('/cart', shopController.getCart);

shopRoutes.post('/cart', shopController.postCard);

shopRoutes.get('/checkout',shopController.getCheckout);


shopRoutes.get('/orders',shopController.getOrders);

module.exports = shopRoutes;