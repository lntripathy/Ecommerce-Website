import express from "express";
import useSignUpController from "../controller/user/userSignUp.js";
import userSignInController from "../controller/user/userSignIn.js";
import { userDetailsController } from "../controller/user/userDetails.js";
import { authToken } from "../middleware/authToken.js";
import { userLogout } from "../controller/user/userLogout.js";
import { allUsers } from "../controller/user/allUsers.js"
import { updateUser } from "../controller/user/updateUser.js";
import uploadProductController from "../controller/product/uploadProduct.js"
import getProductController from "../controller/product/getProduct.js";
import updateProductController from "../controller/product/updateProduct.js";
import getCategoryProduct from "../controller/product/getCategoryProduct.js";
import getCategoryWiseProduct from "../controller/product/getCategoryWiseProduct.js";
import getProductDetails from "../controller/product/getProductDetails.js";
import addToCartController from "../controller/user/addToCartController.js";
import countCartProduct from "../controller/user/countCartProduct.js";

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
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)

// user add to cart
router.post("/add-to-cart", authToken, addToCartController)
router.get("/count-cart-product", authToken, countCartProduct)



export default router 