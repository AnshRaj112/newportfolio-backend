const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.fromEmail,
      pass: process.env.googleAppPassword
    }
});

router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    console.log('Contact data received:', { name, email, message });

    const mailOptions = {
        from: email,
        to: process.env.fromEmail,
        subject: `New message from ${name}`,
        text: `You have a new message from:
        Name: ${name}
        Email: ${email}
        Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email error:", error);
            return res.status(500).json({ message: 'Error sending email' });
        } 
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

module.exports = router;