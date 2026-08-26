const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    // console.log("request to path / of add-something");
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render('admin/add-product', { 
        'pageTitle': 'Add Product',
        isAddProduct: true,
        formCss: true,
        productCss: true,
        activePage: 'add-product',
        path: '/admin/add-product'
    })
};



exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/shop/products');
};


exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('admin/products', { 
            'pageTitle': 'Admin products', 
            prods: products, 
            hasProducts: products.length > 0,
            isShop: true,
            formCss: true,
            productCss: true,
            activePage: 'admin/products',
            path: '/admin/products'
        });
    });
}