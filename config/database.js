import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'bj5vgzah0hgja7thuuxy-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'ujydy7vwodq1490q',
  password: process.env.DB_PASSWORD || 'XNySn5bXqrHB4TZ8aofS',
  database: process.env.DB_NAME || 'bj5vgzah0hgja7thuuxy',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool; // Declare pool outside the try-catch block

async function createPool() {
  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Re-throw the error to be handled elsewhere
  }
}

// Call the function to create the pool and test the connection
async function initialize() {
  try {
    await createPool();
  } catch (error) {
    console.error('Failed to initialize the database pool:', error);
    // Handle the error appropriately, e.g., exit the application
    process.exit(1); // Exit the process if the database connection fails
  }
}

initialize();

export default () => {
  if (!pool) {
    console.error('Database pool is not initialized!');
    throw new Error('Database pool is not initialized!');
  }
  return pool;
};