import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();


const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
}).promise();


async function queryDatabase() {
    try {
        const [rows] = await pool.query("SELECT * FROM createUser");
        console.log(rows);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

//prepared statement
export async function createAccount(userEmail, userFirstName, userLastName,userName,userPw){
    const [result] = await pool.query(
        'INSERT INTO createUser(userEmail, userFirstName,userLastName,userName,userPw) VALUES (?,?,?,?,?)',
        [userEmail, userFirstName, userLastName,userName,userPw])
}

 