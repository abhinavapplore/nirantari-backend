const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const User = require('./model');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FOR_NODEMAILER,
    pass: process.env.PASSWORD_FOR_NODEMAILER,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports.subscriber = [
  body("email").isEmail().withMessage("Invalid email format"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      const mailOptions = {
        from: process.env.EMAIL_FOR_NODEMAILER,
        subject: "Subscription Request",
        to: process.env.TO_EMAIL,
        html: `<h1> Hi, ${email} has requested to Subscribe Nirantara.</h1>`,
      };

      await sendEmail(mailOptions);

      const customerMailOptions = {
        from: process.env.EMAIL_FOR_NODEMAILER,
        subject: "Subscribed for Nirantara",
        to: email,
        html: `<h1>Hi, ${email}<br>This mail is to inform you that you have subscribed to Nirantara Successfully.</h1>`,
      };

      await sendEmail(customerMailOptions);

      const newSubscriber = new User({ email });
      await newSubscriber.save();

      res.status(200).json({ message: "Email Sent Successfully", newSubscriber });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({ error: "Error while processing the request" });
    }
  },
];
