const Sequelize = require('sequelize');


const sequelize = new Sequelize('mydatabase', 'root', 'rootpassword', {dialect: 'mysql', host: 'localhost'});


module.exports = sequelize;