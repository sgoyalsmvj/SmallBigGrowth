import Razorpay from "razorpay";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import Payment from "../models/payment.js";
import authenticateUser from "../middleware/auth.js";
const paymentRouter = Router();

const instance = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

paymentRouter.post("/razorpay", authenticateUser, async (req, res) => {
  try {
    const order = await instance.orders.create({
      amount: req.body.amount,
      currency: "INR",
    });
    res.json({ order_id: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
});

paymentRouter.post("/verification", authenticateUser, async (req, res) => {
  try {
    // console.log(req.body)
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    // console.log({ razorpay_payment_id, razorpay_order_id, razorpay_signature })
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body_data)
      .digest("hex");
    console.log(req);
    // console.log({ expectedSignature, razorpay_signature });
    if (expectedSignature === razorpay_signature) {
      console.log({
        // amount: req.body.amount,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
      const newPayment = new Payment({
        // amount: req.body.amount,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
      await newPayment.save();
      res.redirect(
        `${process.env.FRONTEND_URL}/success/?payment_id=${razorpay_payment_id}`
      );
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the payment" });
  }
});

export default paymentRouter;
