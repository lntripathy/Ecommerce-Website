import { CartProduct } from "../../models/cartProductModel.js"

const countCartProduct = async (req, res) => {
    try {
        const userId = req.userId

        const count = await CartProduct.countDocuments({ userId: userId })

        res.json({
            data: {
                count: count
            },
            message: "",
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            success: false,
            error: true,
        })
    }
}

export default countCartProduct