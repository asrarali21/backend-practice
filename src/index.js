import app from "./app.js";
import ConnectDB from "./db/db.js";
import dotenv from "dotenv"


dotenv.config({
    path : "/.env"
})

ConnectDB().then(()=>{
 try {
       app.listen(process.env.PORT || 8000 , ()=>{
           console.log("server started  on port ",  process.env.PORT || 8000);
           
       })
 } catch (error) {
     console.log("MongoDB connection failed",error);
 }
})