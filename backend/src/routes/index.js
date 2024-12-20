import express from "express";
import useSignUpController from "../controller/userSignup.js";
import userSignInController from "../controller/userSignIn.js";

const router = express.Router()

router.post("/signup",useSignUpController)
router.post("/signin", userSignInController)


export default router 