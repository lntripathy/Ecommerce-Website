import uploadProductPermission from "../helpers/permission.js"
import { Product } from "../models/productModel.js"

const uploadProductController = async (req, res) => {
    try {
        const sessionUserId = req.userId

        console.log("upload product", req.body)
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        const uploadProduct = new Product(req.body)
        const saveProduct = await uploadProduct.save()

        res.json({
            message: "Product upload successfully",
            error: false,
            success: true,
            data: saveProduct
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default uploadProductController
