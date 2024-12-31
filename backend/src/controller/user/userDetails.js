import { User } from "../../models/userModel.js"

export const userDetailsController = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        // console.log("user from userDetails(backend) ", user)   

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details fetched successfully."
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}