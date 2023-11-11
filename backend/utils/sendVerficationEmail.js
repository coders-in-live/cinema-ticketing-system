const { createMailTransporter } = require("./createMailTranspoter");

const sendVerificationEmail = (user) => {
  const transporter = createMailTransporter();
  const mailOption = {
    to: user.email,
    from: process.env.EMAIL_FROM,
    subject: "Please verify your email",
    html: `<h1>Hello ${user.name}</h1><p>Please verify your email by clicking on the link below</p><a href="${process.env.CLIENT_URL}}">Verify</a>`,
  };
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verfication Email Sent");
    }
  });
};

module.exports = sendVerificationEmail;
