const express = require('express');
const dotenv=require('dotenv');
const ConnectDB = require('./config/db');
const productRoutes=require("./routes/product.routes.js")
const userRoutes=require("./routes/user.routes.js")
const cors = require("cors");
const cookieParser = require('cookie-parser');







const app = express();
dotenv.config();



app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173', 'https://ecomprojectfrontend.netlify.app'],
  credentials: true
}));


app.use("/api",productRoutes)
app.use("/api",userRoutes)


app.listen(3000,()=>{
    ConnectDB();
    console.log("Connected to server")
})