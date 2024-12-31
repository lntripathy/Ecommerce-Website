import { Product } from "../../models/productModel.js"

const getProductController = async(req,res)=>{
    try{
        const allProduct = await Product.find().sort({ createdAt : -1 })    // decreasing order (newest first)

        res.json({
            message : "All Product",
            success : true,
            error : false,
            data : allProduct
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

export default getProductController