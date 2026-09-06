const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

    Product.findAll().then( result => {
        res.render('shop/product-list', { 
            'pageTitle': 'My Shop', 
            prods: result, 
            hasProducts: result.length > 0,
            isShop: true,
            formCss: true,
            productCss: true,
            activePage: 'products',
            path: "/products"
        });
    }).catch( err => {
        console.log(err);
    })
    
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId).then((result) => {
        // console.log(rows[0])
        res.render('shop/product-detail', {product:result, pageTitle: result.title, path: 'detail' });
    }).catch(err => {
        console.log(err)
    });
}


exports.getIndex = (req, res, next) => {
    // console.log("request to path /");
    // console.log(rootDir);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    req.user.getProducts().then(products => {
        if(!products) {
            products = [];
        }
        res.render('shop/index', { 
                pageTitle: 'My Shop', 
                prods: products, 
                hasProducts: products.length > 0,
                isShop: true,
                formCss: true,
                productCss: true,
                activePage: 'shop',
                path: "/"
            });
    }).catch(err => {
        console.log(err)
    })

    
    
}


exports.getCart = (req, res, next) => {

    req.user.getCart().then(cart => {
        return cart.getProducts().then(products => {
            res.render('shop/cart', {
                activePage: 'cart',
                pageTitle: 'Cart',
                path: '/cart',
                products: products
            });
        }).catch(err => {
            console.log(err);
        });
    })

    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {

    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({
    //                     productData: product, qty: cartProductData.qty
    //                 });
    //             }
    //         }
    //         res.render('shop/cart', {
    //             activePage: 'cart',
    //             pageTitle: 'Cart',
    //             path: '/cart',
    //             products: cartProducts
    //         });
    //     })
    // });
}

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.prodId;

    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}});
    })
    .then( products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(() => {
        res.redirect('/shop/cart');
    })
    .catch(err => {
        console.log(err);
    })

    // Product.findByPk(prodId).then(prod => {
    //     Cart.delete(prodId, prod.price);
    //     res.redirect('/shop/cart');
    // })
    
}



exports.postCard = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    // console.log(productId);
    // Product.findById(productId, (product) => {
    //     Cart.addProduct(productId, product.price);
    // })

    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: productId}});
    }).then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(productId);
    }).then(product => {
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
    }).then(() => {
        res.redirect('/shop/cart');
    }).catch(err => {
        console.log(err);
    })

}




exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
    })
    .then(products => {
        return req.user.createOrder()
            .then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = {quantity: product.cartItem.quantity};
                    return product;
                }));
            })
            .catch(err => {
                console.log(err);
            })

    })
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/shop/orders');
    })
    .catch(err => {
        console.log(err);
    });
};



exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', {
            activePage: 'orders',
            pageTitle: 'Orders',
            path: '/orders',
            orders: orders
        })
    }).catch(err => {
        console.log(err);
    })
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        activePage: 'checkout',
        pageTitle: 'Checkout'
    })
}

