const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    length: { type: String, required: true },
    timeStart: { type: String, required: true },
    yearPublished: { type: String, required: true },
    genre: [{ type: String }],
    avaliableAt: { type: String },
    // dateTimeShowing: { type: Date, default: new Date() },
    ticketPrice: { type: Number, required: true },
  },
  { timestamps: true }
);
const Cinema = mongoose.model("Cinema", cinemaSchema);
module.exports = Cinema;
