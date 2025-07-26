import { jwt } from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/User.model";



export const verifyJwt = asyncHandler(async(req , res , next) =>{
try {
        const token = req?.cookies?.accessToken || req.header("authorization")?.replace("bearer" , "")
    
        if (!token) {
            throw new ApiError(401 , "unauthorized access")
        }
        
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
              throw new ApiError(401 , "invalid access token")
        }
        req.user = user
        next()
} catch (error) {
     throw new ApiError(401 , "invalid access Token", error)
}
})