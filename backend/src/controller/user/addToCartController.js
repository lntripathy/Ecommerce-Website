import { CartProduct } from "../../models/cartProductModel.js"

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body
        const currentUser = req.userId

        const isProductAvailable = await CartProduct.findOne({ productId, userId: currentUser })

        if(isProductAvailable){
            return res.json({
                message: "Already added to cart",
                success: false,
                error: true,
            })
        }


        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = await CartProduct(payload)
        const savedProduct = await newAddToCart.save()

        res.json({
            data: savedProduct,
            message: "Product Added Sucessfully.",
            success: true,
            error: false,
        })


    } catch (error) {
        res.json({
            message: error?.message || error,
            success: false,
            error: true,
        })
    }
}

export default addToCart