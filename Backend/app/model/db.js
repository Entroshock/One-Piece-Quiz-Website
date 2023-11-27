const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "j34567yulittle",
    database: "mydb",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

exports.createUser = (userData, callback) => {
    pool.query('INSERT INTO createuser SET ?', userData, callback);
};
