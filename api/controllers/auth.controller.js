import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const registerUser = async (req,res,next) => {
    const {
        username,
        email,
        password
    } =  await req.body;
    const oldUser = await User.findOne({username,email})
    if( oldUser && oldUser.username === username){
        return next(errorHandler(500,"username is already taken"))
    }
    if( oldUser && oldUser.email === email){
        return next(errorHandler(500,"email is already registered please log in "))
    } 
    const hashedPassword = await bcryptjs.hashSync(password,10)
    try {
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })
        await newUser.save()
        res.status(201).json({
            message:"User created Successfully"
        })
    } catch (error) {
        return next(error)
    }
}