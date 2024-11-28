import mysql from 'mysql2'
// MySQL Database Connection
export let db;
const dbConnection = async()=>{
    try {
        db = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,  // Replace with your MySQL password
            database: process.env.DATABASE,
            port: process.env.MYASLPORT,
            connectTimeout: 10000
        });
        await db.connect(err => {
            if (err) {
              console.error('Error connecting to the database:', err.message);
            } else {
              console.log('Connected to the MySQL database.');
            }
          });
    } catch (error) {
        console.error("MySQL DB connection FAILED :", error)
        process.exit(1)
    }
}

export default dbConnection