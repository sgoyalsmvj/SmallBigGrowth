import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;