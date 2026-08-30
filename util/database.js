const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'mydatabase',
    password: 'rootpassword'
});


module.exports = pool.promise();