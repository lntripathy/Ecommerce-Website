import Razorpay from "razorpay";
import createRazorpayInstance from "../../config/razorpay.js";
import crypto from "crypto";

export const paymentController = async (req, res) => {
    const { totalPrice } = req.body
    const razorpayInstance = createRazorpayInstance()

    // Create an order
    const options = {
        amount: totalPrice * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
    };
    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.json({
                    message: "Something went wrong while creating order.",
                    error: true,
                    success: false
                })
            }
            return res.json({
                message: "Order created successfully.",
                data: order,
                success: true,
                error: false
            })
        });

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

