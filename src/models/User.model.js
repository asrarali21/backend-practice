import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
const userschema = new Schema({
     username : {
        type : String,
        required:true
     },
     email :{
        type : String,
         required:true
     },
       password :{
        type : String,
         required:[true , "password is required"]
     },
}, {timestamps:true})


// what this does is it is a middleware of mongoose "pre" which tells before saving execute the async function
//isModified is  moongoose inbuild method
userschema.pre("save" , async function (next) {
   if (this.isModified("password")) {
       this.password = await bcrypt.hash(this.password , 10)
   } else {
    next()
   }
})
//here is the login logic if the password entered the user matches the hashed password which is stored in the database its comparing where this.password is store in database
userschema.methods.IspasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}

export const User = mongoose.model("User" , userschema)