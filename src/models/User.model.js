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

userschema.pre("save" , async function (next) {
   if (this.isModified("password")) {
       this.password = await bcrypt.hash(this.password , 10)
   } else {
    next()
   }
})
userschema.methods.IspasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}

export const User = mongoose.model("User" , userschema)