const nodemailer = require("nodemailer");
const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
};
module.exports =  {createMailTransporter} ;
