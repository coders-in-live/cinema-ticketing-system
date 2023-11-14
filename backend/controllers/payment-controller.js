const Cinema = require("../models/cinema");
const Theatre = require("../models/theatre.js");
const Payment = require("../models/payment.js");
const axios = require("axios");
// const {nanoid} = require('nanoid')
const createOrder = async (req, res) => {
  try {
    const amounts = req.body.amount;
    const productId = req.body.id;
    const txRef = req.body.tx_ref;
    if (!productId || !amounts || !txRef) {
      return res.status(400).json({
        msg: "productId and Amount is required",
      });
    }

    const cinemaProduct = await Cinema.findOne({ _id: productId });
    const theatreProduct = await Theatre.findOne({ _id: productId });

    let order; // Declare the order variable

    if (cinemaProduct) {
      const price = cinemaProduct.ticketPrice * amounts;
      console.log(cinemaProduct.ticketPrice);
      console.log(amounts);
      order = {
        productId: cinemaProduct._id,
        productName: cinemaProduct.title,
        productPrice: price,
        txRef: txRef,
      };
      // creating our order
      console.log(order);
      await Payment.create(order);
    } else if (theatreProduct) {
      const price = theatreProduct.ticketPrice * amounts;

      order = {
        productId: theatreProduct._id,
        productName: theatreProduct.title,
        productPrice: price,
        txRef: txRef,
      };
      // creating our order
      await Payment.create(order);
    } else {
      return res.status(404).json({
        msg: "Product not found",
      });
    }

    let chapaRequestData = {
      amount: order.productPrice,
      tx_ref: txRef,
      currency: "ETB",
      // return_url: `https://api.chapa.co/v1/transaction/verify/${txRef}`,
      return_url:"http://localhost/3000/ticket"
    };
    // making a request to chapa server
    const response = await axios.post(
      `https://api.chapa.co/v1/transaction/initialize`,
      chapaRequestData,
      {
        headers: {
          Authorization: "Bearer " + process.env.CHAPA_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.data["status"] == "success") {
      return res.json({
        msg: "Order created successfully",
        paymentUrl: response.data["data"]["checkout_url"],
      });
    } else {
      return res.json({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    if (error.response) {
      return res.status(500).json({
        msg: error.response.data,
      });
    } else {
      return res.status(500).json({
        msg: "error",
      });
    }
  }
};
module.exports = { createOrder };
