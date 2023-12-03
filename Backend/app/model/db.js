import mysql from 'mysql2'
import bcrypt from 'bcryptjs'
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
export async function createAccount(userEmail, userFirstName, userLastName, userName, userPw) {
    // Hash the password
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(userPw, saltRounds);

    const [result] = await pool.query(
        'INSERT INTO createUser (userEmail, userFirstName, userLastName, userName, userPw) VALUES (?, ?, ?, ?, ?)',
        [userEmail, userFirstName, userLastName, userName, hashedPassword]
    );
    return result;
}

//prepared statement for getting the email
export async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM createUser WHERE userEmail = ?', [email]);
    return rows[0];
}


export async function getUserById(userId) {
    try {
        const query = "SELECT * FROM createUser WHERE userId = ?";
        const [rows] = await pool.query(query, [userId]);
        return rows[0]; 
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
}

