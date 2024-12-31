import { Product } from "../../models/productModel.js"


const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await Product.distinct("category")

        //array to store one product from each category
        const productByCategory = []

        for (const category of productCategory) {
            const product = await Product.findOne({ category })

            if (product) {
                productByCategory.push(product)
            }
        }


        res.json({
            message: "category product",
            data: productByCategory,
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

export default getCategoryProduct