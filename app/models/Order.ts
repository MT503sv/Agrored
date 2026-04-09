import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // 👈 IMPORTANTE
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);