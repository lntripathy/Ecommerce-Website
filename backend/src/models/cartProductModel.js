import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        ref: "Product",
        type: String,
    },
    quantity: {
        type: Number,
    },
    userId: {
        type: String,
    },
},{
    timestamps: true
})


export const CartProduct = mongoose.model("CartProduct", cartSchema)
