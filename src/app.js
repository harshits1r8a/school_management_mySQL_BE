import express from 'express'
import cors from 'cors'
import { addSchool, listSchools } from './controllers/School.controllers.js';

const app =  express();

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(cookieParser())
app.use(cors({
    origin : '*',
    credentials:true,
}))

// Routes
// add school routes
app.post('/addSchool', addSchool);

// list school routes
app.get('/listSchools', listSchools);



// False api call
app.all('*',(req, res)=>{
    res.status(404).send({
        "error": {
            "message": "Route not found",
            "type": "string",
            "timestamp": new Date().toISOString(),
            "statusCode": 404
        }
    })
})
// ERROR DESIGN
// app.use(errorMiddleware)

export default app