import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
    },
    brandName: {
        type: String,
    },
    category: {
        type: String,
    },
    productImage: {
        type: [],
    },
    description: {
        type: String,  
    },
    price: {
        type: Number,  
    },
    sellingPrice: {
        type: Number,  
    },
},{
    timestamps: true
})


export const Product = mongoose.model("Product", productSchema)
