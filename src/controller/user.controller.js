import { asyncHandler } from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { User } from "../models/User.model.js"

//custom async handler function to avoid try and catch 
const registerUser  =  asyncHandler ( async (req , res)=>{ 
    //first we have to take the details from user 
    // validate 
    // profile on cloudinary
    //check user exist
    //entry in db

      const {username , email , password} = req.body

     if ([username , email , password].some((item)=>item.trim()=== ""))  {
        throw new apiError(400 , "all field are required")
     }

     const excitedUser = await User.findOne({
        $or :[{username},{email}]
     })

     if (excitedUser) {
        throw new apiError (401 , "user already exist")
     }

     const LocalProfilepath = req.files.path
})

export {registerUser}