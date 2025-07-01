import express from "express"
import cors from "cors"
const app = express()


app.use(cors())
app.use(express.json({limit:"16kb"}))

app.get("/" , (req , res)=>{
    res.send("server started")
})
export default app