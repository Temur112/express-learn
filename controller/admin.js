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

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then( result => {
        console.log(result);
        res.redirect('/shop')
    }).catch(err => {
        console.log(err);
    });
    
};

exports.getEditProduct = (req, res, next) => {
    // console.log("request to path / of add-something");
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    const editMode = req.query.edit;

    if(!editMode) {
        return res.redirect('/shop');
        
    }

    const productId = req.params.productId;


    Product.findByPk(productId).then( result => {
        if(!result) {
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
            product: result
        });
    }).catch( err => {
        console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateDescription = req.body.description;
     
    Product.findByPk(prodId).then(result => {
        result.title = updatedTitle,
        result.price = updatedPrice,
        result.imageUrl = updatedImageUrl,
        result.description = updateDescription

        result.save();
    }).then(result => {
        console.log('Product updated');
        res.redirect('/admin/products');
    }).catch( err => {
        console.log(err);
    });
}


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.deleteBy(prodId);

    res.redirect('/admin/products');
    
}




exports.getProducts = (req, res, next) => {
    Product.findAll().then(
        products => {
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
    }).catch(err => {
        console.log(err);
    });
}