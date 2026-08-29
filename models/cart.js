const fs = require('fs');
const path = require('path');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};

            if(!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedproduct;
            if (existingProduct) {
                updatedproduct = {...existingProduct};
                updatedproduct.qty = updatedproduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedproduct;
            } else {
                updatedproduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedproduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            });

        });
    }

    static delete(prodId, prodPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === prodId);

            if(!product){
                return
            }

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== prodId);
            const prodQty = product.qty;
            updatedCart.totalPrice = updatedCart.totalPrice - prodPrice * prodQty; 

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if(err) {
                    console.log(err);
                }
            })
        });
    }


    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(!err) {
                const cart = JSON.parse(fileContent);
                cb(cart);
            } else {
                cb(null);
                console.log(err)
            }
        })
    }
}

