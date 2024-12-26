export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token")

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: null
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}