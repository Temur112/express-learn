const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin.routes');
const shopRoutes = require('./routes/shop.routes');
const errorController = require('./controller/error');


// const { engine } = require('express-handlebars');
const app = express();


// app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const sequalize = require('./util/database');


const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrdertItem = require('./models/order-item');


app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);



app.use(errorController.get404Page);

mongoose
    .connect('mongodb://root:example@localhost:27017/mydb?authSource=admin')
    .then(result => {
        console.log('connected');
    })
    .catch(err => {
        console.log(err);
    })


// Product.belongsTo(User, {
//     constraints: true,
//     onDelete: 'CASCADE'
// });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through: OrdertItem});


// sequalize
//     // .sync({force: true})
//     .sync()
//     .then(result => {
//         User.findByPk(1).then(user => {
//             if(!user) {
//                 return User.create({name: 'Max', email: 'test@example.com'});
//             }

//             return Promise.resolve(user);
//         }).then(user => {
//             console.log(user);
//             user.createCart();
//             app.listen(3000, () => {
//                 console.log('Server is running on port 3000');
//             });
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     });



