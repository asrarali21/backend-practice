
import mongoose from "mongoose";


const ConnectDB =async () =>{
    try {
     const connectionInstance= await   mongoose.connect(process.env.MONGODB_URI)
     console.log("DB CONNECTED " , `${connectionInstance.connection.host}`);
     
    } catch (error) {
        console.error("failed to connect db" ,error)
        
    }
}

export default ConnectDB