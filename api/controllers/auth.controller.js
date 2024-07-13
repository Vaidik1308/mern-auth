import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const registerUser = async (req,res) => {
    const {
        username,
        email,
        password
    } =  await req.body;
    const oldUser = await User.findOne({username,email})
    if( oldUser && oldUser.username === username){
        return res.status(500).json({
            message:"username is already taken"
        })
    }
    if( oldUser && oldUser.email === email){
        return res.status(500).json({
            message:"email is already registered please log in "
        })
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
        res.status(500).json({
            message:error.message
        })
    }
}