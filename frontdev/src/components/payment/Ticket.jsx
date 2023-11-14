/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "../../elements";
import master from "../../assets/images/master.png";
import visa from "../../assets/images/visa.png";
import credit from "../../assets/images/credit.png";
import paypal from "../../assets/images/paypal.png";
import ticket from "../../assets/images/cinema.jpeg";
// import ticket from "../../assets/images/chapa.svg";

import { useParams } from "react-router-dom";
import axios from "axios";
const { v4: uuid4 } = require("uuid");

const Ticket = () => {
  const [showModal, setShowModal] = useState(true);
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("");
  const { id } = useParams();
  const tx_ref = uuid4();

  const handleClick = () => {
    setShowModal(true);
    console.log(showModal);
  };
  const handleChapa = (e) => {
    console.log("clicked chapa");
    e.preventDefault();
    axios
      .post("http://localhost:3001/buyticket", { id, amount,tx_ref })
      .then((res) => {
        setTimeout(() => {
          window.location.href = res.data.paymentUrl;
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCinema(id);
    getTheatre(id);
  }, [id]);
  async function getTheatre(id) {
    var response = await axios.get(
      `http://localhost:3001/cinemabyid/${id}`,
      {}
    );
    if (response.status === 200) {
      const data = response.data;
      setValue(data);
    }
  }

  async function getCinema(id) {
    var response = await axios.get(
      `http://localhost:3001/cinemabyid/${id}`,
      {}
    );
    if (response.status === 200) {
      const data = response.data;
      setValue(data);
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="border border-cinema-500 border-4 rounded-lg pl-10 w-[700px] h-[700px]">
        <h2 className="text-heading_2 font-medium  pb-5 text-left">
          Payment Method
        </h2>
        <div className="pb-5">
          <div className="flex py-5">
            <p className="text-base font-regular my-5 mr-4">
              Number of Ticket You want
            </p>
            <TextInput
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="px-4 py-2 bg-yellow-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div className="flex justify-between mt-10">
            <div className="space-y-20 text-lg">
              <div>
                <input
                  type="radio"
                  name="color"
                  id="pay-card"
                  value="card"
                  className="form-radio mr-2"
                />
                <label htmlFor="pay-card">
                  Credit card, Debit card, Gift card
                  <div className="flex flex-wrap">
                    <img src={credit} alt="credit card" className="w-16" />
                    <img src={visa} alt="visa card" className="w-16" />
                    <img src={master} alt="master card" className="w-16" />
                  </div>
                </label>
                <div className="space-y-5">
                  <p className="text-base font-regular">Card Number</p>
                  <TextInput className="rounded-none bg-[#F2F2F2] w-64 h-[40px] disable" />
                </div>
              </div>
              <div>
                <button type="submit" className="btn">
                  Pay pal
                  <img
                    src={paypal}
                    alt="pay_pal_logo"
                    className="w-16"
                    style={{
                      width: "100px",
                      paddingLeft: "15px",
                      paddingTop: "5px",
                    }}
                  />
                </button>
              </div>
              <div className="space-y-5">
                <form onSubmit={handleChapa}>
                  <button type="submit" className="btn">
                    Pay with
                    <img
                      src="/images/chapa.svg"
                      alt="chapa image"
                      style={{
                        width: "100px",
                        paddingLeft: "15px",
                        paddingTop: "5px",
                      }}
                    />
                  </button>
                </form>
              </div>
            </div>

            <div className="text-lg bg-bg_additional w-30 h-[400px] p-5 py-10 rounded-3xl">
              <p className="text-center">Purchase Summary</p>
              <div className="flex justify-between py-5">
                <div className="text-right space-y-3">
                  <p>Movie Name:</p>
                  <p>Price:</p>
                  <p>Amount of Person:</p>
                  <p>Total Price</p>
                </div>
                <div className="text-left space-y-3">
                  <p>{value.title}</p>
                  <p>{value.ticketPrice}</p>
                  <p>{amount}</p>
                  <p>{value.ticketPrice * amount}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-72 mt-10"
                onClick={() => handleClick()}
              >
                Make Payment
              </Button>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm h-full w-full">
            <div className="flex items-center justify-center  h-screen">
              <div className="text-center bg-white p-5 shadow-2xl  w-30 h-[500px]">
                <div className="flex justify-center">
                  <img src={ticket} alt="cinema_ticket" className="w-64" />
                </div>
                <h2 className="text-heading_1 font-medium">Thank you!</h2>
                <p className="text-heading_2">Here is your ticket</p>
                <div className="flex py-10">
                  <Button
                    variant="tertiary"
                    className="w-72 mr-10"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Get by email
                  </Button>
                  <Button
                    variant="tertiary"
                    className="w-72"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Get by referral code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;
