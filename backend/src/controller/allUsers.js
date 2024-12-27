import { User } from '../models/userModel.js'


export const allUsers = async (req, res) => {
    try {

        const allUsers = await User.find()

        console.log("all users from backend : ",    allUsers)

        res.json({
            message: "All users fetched successfully.",
            data: allUsers,   
            success: true,
            error: false   
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
