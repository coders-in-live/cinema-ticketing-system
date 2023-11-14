import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full  bg-black flex mt-20 p-30 ">
      <div className="container mx-auto px-4 py-12 text-white font-bold items-center">
        <h3 className="text-4xl font-heading">Contact Us </h3>
        <div className="flex flex-row mt-10">
          <a href="tel:+251940665240" className="mr-2 text-4xl">
         <FaPhone size={'2em'} />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 text-white font-bold items-center">
        <h3 className="text-4xl font-heading">Follow us</h3>
        <div className="flex flex-row mt-10">
          <a href="tww" target="_blank" className="mr-10">
            <FaTwitter size={'3.5em'}/>
          </a>
          <a href="facebook" target="_blank" className="mr-10">
            <FaFacebook size={'3.5em'}/>
          </a>
          <a href="insta" target="_blank" className="mr-10">
            <FaInstagram size={'3.5em'}/>
          </a>
          <a href="insta" target="_blank" className="mr-10">
            <FaWhatsapp size={'3.5em'}/>
          </a>
          <a href="insta" target="_blank" className="mr-10">
            <FaTelegram size={'3.5em'}/>
          </a>
          
        </div>
      </div>
    </footer>
  );
};
export default Footer;
