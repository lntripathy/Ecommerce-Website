import jwt from 'jsonwebtoken'

export const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.json({
                message: "User not Login",
                error: true,
                success: false
            })
        }

        // verification of token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            // console.log(err)
            // console.log("decoded  ", decoded)

            if (err) {
                console.log("error auth", err)
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false,
                });
            }
            req.userId = decoded?._id

            next()
        })

        // console.log("token " + token)
    } catch (error) {
        res.json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        })
    }
}

