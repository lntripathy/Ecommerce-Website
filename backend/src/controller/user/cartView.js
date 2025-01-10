import { CartProduct } from "../../models/cartProductModel.js"

const cartView = async (req, res) => {
    try {
        const currentUser = req.userId

        const allProduct = await CartProduct.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })
    } catch (error) {
        res.json({
            message: error?.message || error,
            success: false,
            error: true,
        })
    }
}

export default cartView