import crypto from "crypto";

export const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body
    const secret = process.env.RAZORPAY_KEY_SECRET

    // creating hmac object
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(order_id + "|" + payment_id)

    const generatedSignature = hmac.digest('hex')
    if (generatedSignature === signature) {
        return res.json({
            message: "Payment verified successfully.",
            success: true,
            error: false
        })
    } else {
        return res.json({
            message: "Payment verification failed.",
            success: false,
            error: true
        })
    }   
}
