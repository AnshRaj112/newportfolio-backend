const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service you prefer
    auth: {
      user: process.env.fromEmail, // Replace with your email
      pass: process.env.googleAppPassword   // Replace with your email password or app password if using 2FA
    }
});

router.post("/", (req, res) => {
    const {name, email, message} = req.body;

    const mailOptions = {
        from: email,
        to: process.env.fromEmail, // Replace with your email
        subject: `New message from ${name}`,
        text: `You have a new message from:
        Name: ${name}
        Email: ${email}
        Message: ${message}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending email' });
    } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    }
    });

    console.log('Contact data received:', { name, email, message });
    res.status(200).json({ message: 'Contact data received successfully' });
})

module.exports = router;