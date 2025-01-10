import { CartProduct } from "../../models/cartProductModel.js"


const updateCartCount = async(req,res)=>{
    try{
        // const currentUserId = req.userId 
        const CartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await CartProduct.updateOne({_id : CartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(error){
        res.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}

export default updateCartCount