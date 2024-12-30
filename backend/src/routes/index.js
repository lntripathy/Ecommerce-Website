import express from "express";
import useSignUpController from "../controller/userSignUp.js";
import userSignInController from "../controller/userSignIn.js";
import { userDetailsController } from "../controller/userDetails.js";
import { authToken } from "../middleware/authToken.js";
import { userLogout } from "../controller/userLogout.js";
import { allUsers } from "../controller/allUsers.js"
import { updateUser } from "../controller/updateUser.js";
import uploadProductController from "../controller/uploadProduct.js"

const router = express.Router()

router.post("/signup",useSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/logout", userLogout)

// admin panel
router.get("/all-users",authToken, allUsers)
router.post("/update-user",authToken, updateUser)

// product
router.post("/upload-product", authToken, uploadProductController)

export default router 