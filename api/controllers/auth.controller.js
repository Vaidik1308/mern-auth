import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

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
        return next(errorHandler(500,error.message))
    }
}

export const loginUser = async (req,res,next) => {
    const {
        email,
        password
    } =  await req.body;
    try {
        const user = await User.findOne({email})

        // const actualPassword = await bcryptjs
        //error handling if no user is there for such email
        if(!user){
            return next(errorHandler(404,"User does not exists, Please register first"))
        }

        //checking if password is correct or not
        const validPassword = await bcryptjs.compareSync(password,user.password)
        if(!validPassword) return next(errorHandler(401,'wrong Credentials'))

        //takin user data except password
        // doc is needed else we get the unnecessarily info
        const {password:oldPassword,...validUser} = user._doc 

        //generating a expiry date of 1hour
        const expiryDate = new Date(Date.now() + 3600000) // 1hour
        
        //generation a jwt token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        // storing it in a localStorage as access-token with expiry date
        res
            .cookie('access-token',token,{httpOnly:true,expires:expiryDate})
            .status(200)
            .json(validUser)

    } catch (error) {
        //error handling 
        return next(errorHandler(500,error.message))
    }
}