const express=require("express");
const app = express();
const fs = require("fs");
const {logger} = require("./middleware/logger");
const {errorHandler} = require("./middleware/errorhandler")
const {userRouter} = require("./routes/userroute")

require("dotenv").config()

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(logger);
app.use(errorHandler)


// Handle GET requests for the root URL ("/") and display a welcome message.
app.get("/",async(req,res)=>{
    try {
        res.send("Welcome 😎!")
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

app.use('/users',userRouter)

// Handle invalid routes
app.use(logger,(req, res) => {
    res.status(404).send({ error: 'Not found' });
});





app.listen(PORT,()=>{
    console.log(`Connected to ${PORT} Port`)
});