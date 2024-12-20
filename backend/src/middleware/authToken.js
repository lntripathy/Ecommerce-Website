import jwt from 'jsonwebtoken'

export const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token 

        if(!token){
            return res.json({
                message: "User not Login",
                error: true,
                success: false
            })
        }

        // verification of token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            console.log(err)
            console.log("decoded  ", decoded)

            if(err){
                console.log("error auth", err)
            }
            req.user.id = decoded?._id
            
            next()
        })

        console.log("token " + token)
    } catch (error) {  
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        })
    }
}
