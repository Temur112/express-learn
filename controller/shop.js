const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // console.log("request to path /");
    // console.log(rootDir);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    const products = Product.fetchAll(products => {
            res.render('shop/product-list', { 
            'pageTitle': 'My Shop', 
            prods: products, 
            hasProducts: products.length > 0,
            isShop: true,
            formCss: true,
            productCss: true,
            activePage: 'products',
            path: "/products"
        });
    });
    
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        console.log(product);
        res.render('shop/product-detail', {product:product, pageTitle: product.title, path: 'detail' });
    })
}


exports.getIndex = (req, res, next) => {
    // console.log("request to path /");
    // console.log(rootDir);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    const products = Product.fetchAll(products => {
        res.render('shop/index', { 
            'pageTitle': 'My Shop', 
            prods: products, 
            hasProducts: products.length > 0,
            isShop: true,
            formCss: true,
            productCss: true,
            activePage: 'shop',
            path: "/"
        });
    });
    
}


exports.getCart = (req, res, next) => {

    Cart.getCart(cart => {
        Product.fetchAll(products => {

            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: product, qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                activePage: 'cart',
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts
            });
        })
    });

    
}

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findById(prodId, prod => {
        Cart.delete(prodId, prod.price);
        res.redirect('/shop/cart');
    })
    
}



exports.postCard = (req, res, next) => {
    const productId = req.body.productId;
    // console.log(productId);
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    })

    res.redirect('/shop/cart')
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        activePage: 'orders',
        pageTitle: 'Orders',
        path: '/orders'
    })
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        activePage: 'checkout',
        pageTitle: 'Checkout'
    })
}

