import React, { useState } from "react";
import { Button, TextInput } from "../../elements";
import arrow_up from "../../assets/icons/down-chevron.png";
import master from '../../assets/images/master.png'
import visa from '../../assets/images/visa.png'
import credit from '../../assets/images/credit.png'
import paypal from '../../assets/images/paypal.png'
import ticket from '../../assets/images/cinema.jpeg'

const Pay = () => {
 const [showModal, setShowModal] = useState(false)
 
 const handleClick = () => {
  setShowModal(true)
  console.log(showModal);
 }

  return (
    <div className="border border-cinema-500 border-4 rounded-lg pl-10 w-[700px] h-[700px]">
      <h2 className="text-heading_2 font-medium  pb-5 text-left">Payment Method</h2>
      <div className="pb-5">
          <div className="flex py-5">
            <p className="text-base font-regular my-5 mr-4">
              Number of Ticket You want
            </p>
            <TextInput className="rounded-none bg-[#F2F2F2] w-48 h-[60px] " />
            <div>
              {/* <Button variant="form" className="w-[20px] h-[20px]">
                {/* <img
                  src={arrow_up}
                  alt="arrow_up"
                  className="rotate-180 w-2 h-2"
                /> 
              </Button> */}
              <p className="bg-bg_secondary p-2 w-[30px] h-[30px] "> <img
                  src={arrow_up}
                  alt="arrow_up"
                  className="rotate-180 w-3 h-3"
                /> </p>
              {/* <Button variant="form" className="-my-2">
                <img src={arrow_up} alt="arrow_up" className="w-2 h-2" />
              </Button> */}
              <p className="bg-bg_secondary p-2 w-[30px] h-[30px] "><img src={arrow_up} alt="arrow_up" className="w-3 h-3" /></p>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <div className="space-y-20 text-lg">
              <div>
                <input type="radio" name="color" id="pay-card" value="card" className="form-radio mr-2" />
                <label for="pay-card">Credit card, Debit card, Gift card
                <div className="flex flex-wrap"><img src={credit} alt="credit card" className="w-16"/><img src={visa} alt="visa card" className="w-16"/><img src={master} alt="master card" className="w-16"/></div></label>
                <div className="space-y-5">
                  <p className="text-base font-regular">
                  Card Number 
                  </p>
                  <TextInput className="rounded-none bg-[#F2F2F2] w-64 h-[40px] " />
                </div>
              </div>
              <div >
                <input type="radio" name="color" id="pay-pal" value="card" className="form-radio mr-2" />
                <label for="pay-pal" className="">Pay pal<img src={paypal} alt="pay_pal_logo" className="w-16"/></label>
                <div className="space-y-5">
                    <p className="text-base font-regular">
                    Account Number  
                    </p>
                    <TextInput className="rounded-none bg-[#F2F2F2] w-64 h-[40px] " />
                  </div>
              </div>
            </div>

            <div className="text-lg bg-bg_additional w-30 h-[400px] p-5 py-10 rounded-3xl"> 
           
              <p className="text-center">Purchase Summary</p>
              <div className="flex justify-between py-5">
                <div className="text-right space-y-3">
                  <p>Movie Name:</p>
                  <p>Price:</p>
                  <p>Amount of Person:</p>
                  <p>Food Price:</p>
                </div>
                <div className="text-left space-y-3">
                  <p>Movie Name</p>
                  <p>Price</p>
                  <p>Amount of Person</p>
                  <p>Food Price</p>
                </div>
            </div>
            <Button variant="secondary" className='w-72 mt-10' onClick={()=>handleClick()}>Make Payment</Button>
            </div>
          </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm h-full w-full">
          <div className="flex items-center justify-center  h-screen">
            <div className="text-center bg-white p-5 shadow-2xl  w-30 h-[500px]">
              <div className="flex justify-center"><img src={ticket} alt="cinema_ticket" className="w-64"/></div>
              <h2 className="text-heading_1 font-medium">Thank you!</h2>
              <p className="text-heading_2">Here is your ticket</p>
              <div className="flex py-10">
                <Button variant='tertiary' className='w-72 mr-10' onClick={()=>{setShowModal(false)}}>Get by email</Button>
                <Button variant='tertiary' className='w-72' onClick={()=>{setShowModal(false)}}>Get by referral code </Button>
              </div>
            </div>
          </div>
        </div>
      )}
     </div>
  );
};

export default Pay;
