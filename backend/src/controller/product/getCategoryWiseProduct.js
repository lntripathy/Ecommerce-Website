import { Product } from "../../models/productModel.js"

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await Product.find({ category })

        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default getCategoryWiseProduct