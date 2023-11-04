const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const User = require("../model");


const sendMail = async (req, res) => {
    res.send({
        message: 'i am mail'
    })
}

const sendEmail = async (req, res) => {
    const { email } = req.body;
    const sendMailAdminPanel = (emailList, emailData) => {
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 587,
                secure: false,
                auth: {
                    user: "1shraddhanand@gmail.com",
                    pass: "tlutmpqgccmbrtdj",
                },
            });
            let mailOptions = {
                from: "1shraddhanand@gmail.com",
                to: emailList,
                subject: emailData.subject,
                html: emailData.message,
            };
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    reject(err);
                }
                resolve("Message Sent!");
            });
        });
    };
    try {
        const message = `
      <h1>🎉 Congratualtions</h1>
      <h2>Hi, ${email}</h2>
      <h2>✅ This Mail Is To Inform You That You Have Subscribed To Nirantara Successfully.</h2>
      <h3>Our Team Will Connect To You.</h3>
    `;

        await sendMailAdminPanel(email, {
            message: message,
            subject: "Subscription Request For Nirantara",
        });

        return res.status(200).json({ message: "Email Subscribed" });
    } catch (error) {
        console.log(error);
        return res.status(400).json(Err(error.message, { error }));
    }
};



module.exports = { sendMail, sendEmail }