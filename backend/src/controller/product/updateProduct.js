import { Product } from "../../models/productModel.js"
import uploadProductPermission from "../../helpers/permission.js"


const updateProductController = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        const { _id, ...resBody } = req.body

        const updateProduct = await Product.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Product update successfully",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default updateProductController