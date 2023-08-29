const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    length: { type: String, required: true },
    timeStart: { type: String, required: true },
    // dateTimeShowing: { type: Date, default: new Date() },
    ticketPrice: { type: Number, required: true },
  },
  { timestamps: true }
);
const Theatre = mongoose.model("Theatre", theatreSchema);
module.exports = Theatre;
