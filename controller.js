const express = require("express");
const dotenv = require("dotenv").config();
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
  
module.exports.subscriber = [
    body("email").not().isEmpty().withMessage("Email Field is required"),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors);
        } 

        else {
          const { email } = req.body;
          let mailOptions = {
            from: process.env.EMAIL_FOR_NODEMAILER,
            subject: "Subscription Request",
            to: process.env.TO_EMAIL,
            html: `<h1> Hi, ${email} has requested to Subscribe Nirantara . </h1>`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.status(400).json({ error: "error while sending mail" });
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          let customerMailOptions = {
            from: process.env.EMAIL_FOR_NODEMAILER,
            subject: "Subscribed for Nirantara",
            to: email,
            // template: "subscription", to do later for betterment
            html: `<h1>
            Hi, ${email}<br> 
            This mail is to inform you that you have subscribed to Nirantara Successfully. </h1>`,
          };
          transporter.sendMail(customerMailOptions, function (error, info) {
            if (error) {
              res.status(400).json({ error: "error while sending mail" });
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          const subsciber = new User({
            email,
          });
          const newsubscriber = await subsciber.save();
          console.log('hi ->');
          res.status(200).json({ 
            message: "Email Sent Successfully",
            newsubscriber
        });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    },
  ];
  