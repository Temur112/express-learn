const Product = require('../models/product')


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
    res.render('shop/cart', {
        activePage: 'cart',
        pageTitle: 'Cart',
        path: '/cart'
    })
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

