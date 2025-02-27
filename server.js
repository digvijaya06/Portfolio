import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5501;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Corrected body-parser usage

// Route for handling form submission and sending email
app.post('/send-email', (req, res) => {
    const { fullName, email, mobileNumber, subject, message } = req.body;

    // Create transporter with environment variables
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    // Email options
    const mailOptions = {
        from: `"Raunak Agarwal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text: `Name: ${fullName}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nMessage: ${message}\nWe will get back to you shortly`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
