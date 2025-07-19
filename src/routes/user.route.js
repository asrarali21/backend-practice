import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { registerUser } from "../controller/user.controller";

const router = Router()

router.route("/register").post(upload.single("profilePic"), registerUser)


export {router}