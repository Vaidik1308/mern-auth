import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to mongodb");
})
.catch((err) => {
    console.log(err);
})

const PORT = 3000
const app = express()

app.use("/api/user",userRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})