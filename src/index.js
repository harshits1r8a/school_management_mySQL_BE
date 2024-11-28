import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import dbConnection from './db/dbConnection.js'
const port  = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({ 
    "Status": 200,
    "Data": "Welcome to School management",
    "Error":"null",
  })
})



dbConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️  SchoolManagement is listening on port : ${port}`);
        })
        app.on("error", (error) => {
            console.log("ERROR (in index file for app)", error);
            throw error;  
        })
    })
    .catch((error) => {
        console.error("SchoolManagement connection failed (in index file) !!!:", error)
    })