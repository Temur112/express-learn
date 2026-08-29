const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    // console.log("request to path / of add-something");
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render('admin/edit-product', { 
        'pageTitle': 'Add Product',
        isAddProduct: true,
        formCss: true,
        productCss: true,
        activePage: 'add-product',
        path: '/admin/add-product',
        editing: false
    })
};



exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/shop/products');
};

exports.getEditProduct = (req, res, next) => {
    // console.log("request to path / of add-something");
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    const editMode = req.query.edit;

    if(!editMode) {
        return res.redirect('/shop');
        
    }

    const productId = req.params.productId;


    Product.findById(productId, product => {
        if(!product) {
            return res.redirect('/shop')
        }
        res.render('admin/edit-product', { 
            'pageTitle': 'Edit Product',
            isAddProduct: true,
            formCss: true,
            productCss: true,
            activePage: 'add-product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateDescription = req.body.description;

    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updateDescription, updatedPrice);
    updatedProduct.save();

    res.redirect('/admin/products')
}


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.deleteBy(prodId);

    res.redirect('/admin/products');
    
}




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