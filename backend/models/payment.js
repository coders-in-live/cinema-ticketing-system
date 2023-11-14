const mongoose =  require("mongoose")
const orderSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true, default:0 },
    txRef: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const Payment = mongoose.model("BUYTICKET", orderSchema);
module.exports = Payment;
