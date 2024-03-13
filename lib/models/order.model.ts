import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    billingInfo: {
      name: { type: String, required: true },
      phoneNo: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        automation: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Automation",
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, "Please select payment method"],
      enum: {
        values: ["PayPal", "Card", "Crypto"],
        message: "Please select: PayPal, Card or Crypto",
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["Processing", "Delivered"],
        message: "Please select correct order status",
      },
      default: "Processing",
    },
  },
  { timestamps: true }
);
export const Order =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);
