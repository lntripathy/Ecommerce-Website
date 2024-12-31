import bcrypt from 'bcrypt';
import { User } from "../../models/userModel.js";
import jwt from 'jsonwebtoken'


const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password") 
        }


        const user = await User.findOne({email})

        if(!user){
            throw new Error("Invalid email or password")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        console.log(checkPassword)

        if(checkPassword){
            const tokenData = {
                _id: user.id,
                email: user.email
            }
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" })


            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: "lax"
            }
            res.cookie("token", token, tokenOption).json({
                message: "Login Successfully",
                data: token,
                success: true,
                error: false
            })
        } else{
            throw new Error("Please check the Password")
        }

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

export default userSignInController