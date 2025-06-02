const express = require('express');
const dotenv=require('dotenv');
const ConnectDB = require('./config/db');
const productRoutes=require("./routes/product.routes.js")
const cors = require("cors")






const app = express();
dotenv.config();



app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://ecomprojectfrontend.netlify.app/'],
  credentials: true
}));
app.use("/api",productRoutes)


app.listen(3000,()=>{
    ConnectDB();
    console.log("Connected to server")
})