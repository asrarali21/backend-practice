import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/User.model.js"
import { uploadoncloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

//custom async handler function to avoid try and catch 
const registerUser  =  asyncHandler ( async (req , res)=>{ 
    //first we have to take the details from user 
    // validate 
    //check user exist
    // profile on cloudinary
    //entry in db

      const {username , email , password} = req.body

     if ([username , email , password].some((item)=>item?.trim()=== ""))  {
        throw new ApiError(400 , "all field are required")
     }

     const excitedUser = await User.findOne({
        $or :[{username},{email}]
     })

     if (excitedUser) {
        throw new ApiError (401 , "user already exist")
     }

     const LocalProfilepath = req.file.path

     const profile = await uploadoncloudinary(LocalProfilepath)
    
     
if (!profile || !profile.url) {
    throw new ApiError(500, "Profile upload failed");
}

     const newUser = await User.create({
        username,
        email,
        password,
        profilePic : profile.url
     })

     const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
     )

     if (!createdUser) {
        throw new ApiError(401 , "something went wrong registering user")
     }

     return res.status(200).json(
        new  ApiResponse(200 , createdUser , "user registred successfully")
     )
})

export {registerUser}