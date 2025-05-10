import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
dotenv.config({
    path:".env"
})

// app config 
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()
// middleware
app.use(express.json())
app.use(cors());

//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)   
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.get('/',(req,res)=>{
    res.send("hey bro")
})

app.listen(port, ()=>{
    console.log(`server is running on PORT :`+ port)
})