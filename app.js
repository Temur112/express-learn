const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin.routes');
const shopRoutes = require('./routes/shop.routes');
const errorController = require('./controller/error');


// const { engine } = require('express-handlebars');
const app = express();


// app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const sequalize = require('./util/database');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

app.use(errorController.get404Page);


sequalize.sync()
    .then(result => {
        console.log(result);


        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });


    })
    .catch(err => {
        console.log(err);
    });



