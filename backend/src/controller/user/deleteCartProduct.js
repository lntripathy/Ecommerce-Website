import { CartProduct } from "../../models/cartProductModel.js"


const deleteCartProduct = async (req, res) => {
    try {
        const productName = req?.body?.productName
        const addToCartProductId = req.body._id

        const deleteProduct = await CartProduct.deleteOne({ _id: addToCartProductId })

        res.json({
            message: `${productName} removed from cart.`,
            error: false,
            success: true,
            data: deleteProduct
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

export default deleteCartProduct