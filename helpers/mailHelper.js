// Import the Nodemailer library
const nodemailer = require("nodemailer");

module.exports.sendMail = (subject, mail, html) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.GMAIL_APP_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: process.env.GMAIL_APP_EMAIL,
    to: mail,
    subject: subject,
    html: html,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};
