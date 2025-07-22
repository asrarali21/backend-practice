import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/User.model.js"
import { uploadoncloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

  const GenerateAccessAndRefreshToken = async(userId)=>{
   try {
      const user = await User.findById(userId)
      const accessToken = user.GenerateAccessToken()
      const refreshToken = user.GenerateRefreshToken()
      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})
      return {accessToken , refreshToken}
   } catch (error) {
      throw new ApiError(500 , "something went wrong")
   }
  }


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

const loginUser = asyncHandler (async(req , res)=>{
   // extract data from req.body
   //validate
   //check if user exist 
   //check password 
      const {email , password} = req.body
      
      if (!email || !password) {
         throw new ApiError (401, "email and password is required" )
      }

      
      const user = await User.findOne({email})


      if (!user) {
         throw new ApiError(402 , "user not found")
      }
         //method from user model
      const isPasswordValid = await user.IspasswordCorrect(password)
            
      if (!isPasswordValid) {
         throw new ApiError(401 , "invalid creadential")
      }


      const {accessToken , refreshToken} = await GenerateAccessAndRefreshToken(user._id)
       
      const loggedInUser = await User.findById(user.id).select("-password -refreshToken")
      

      const options = {
       httpOnly : true,
      secure : true 
      }
      return res.status(200)
      .cookie("accesstoken" ,accessToken , options )
     .cookie("refreshtoken" ,refreshToken , options )
     .json(
      ApiResponse(200 , 
         {
            user : loggedInUser , accessToken , refreshToken
         },
         "user logged in successfully"
      )
     )
    


})


export {registerUser}