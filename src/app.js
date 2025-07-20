import express, { Router } from "express"
import cors from "cors"
const app = express()


app.use(cors())
app.use(express.json({limit:"16kb"}))

import { router } from "./routes/user.route.js"

app.use("/api/v1/user", router)

export default app