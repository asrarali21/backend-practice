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
//here is the login logic
//in this we have created method which is to compare or check the password which is stored in db is matching with the password entered by the user when login 
userschema.methods.IspasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}

export const User = mongoose.model("User" , userschema)