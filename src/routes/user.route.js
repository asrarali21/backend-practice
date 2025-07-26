import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { loginUser, registerUser } from "../controller/user.controller.js";
import { verifyJwt } from "../controller/auth.middleware.js";

const router = Router()

router.route("/register").post(upload.single("profilePic"), registerUser)

router.route("/login").post(loginUser)

router.route("/login").post(verifyJwt , logoutuser)
export {router}