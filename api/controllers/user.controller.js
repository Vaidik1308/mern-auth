import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const getUsers = (req,res) => {
    res.json({
        message:"API is working"
    })
}

export const UpdateDetails = async (req,res,next) => {

    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You can update only your account'))
    }
    
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profileImg:req.body.profileImg
                }
            },
            {new:true}
        )

        const {password,...rest} = updatedUser._doc;
        return res.status(200).json({
            success:true,
            user:rest
        })
    } catch(error) {
        return {
            success:false
        }
    }
    
}