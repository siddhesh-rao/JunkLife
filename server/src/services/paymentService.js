import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "../config/env.js";

const razorpay =
  env.razorpayKeyId && env.razorpayKeySecret
    ? new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret })
    : null;

export const createRazorpayOrder = async ({ amount, receipt }) => {
  if (!razorpay) {
    return {
      id: `simulated_order_${Date.now()}`,
      currency: "INR",
      amount: Math.round(amount * 100),
      receipt,
      simulated: true
    };
  }

  return razorpay.orders.create({ amount: Math.round(amount * 100), currency: "INR", receipt });
};

export const verifyPaymentSignature = ({ orderId, paymentId, signature }) => {
  if (!env.razorpayKeySecret || signature === "simulated") {
    return true;
  }

  const digest = crypto
    .createHmac("sha256", env.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return digest === signature;
};
