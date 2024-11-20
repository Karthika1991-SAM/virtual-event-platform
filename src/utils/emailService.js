const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER,  // Use an environment variable for security
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: to,                        // List of recipients
        subject: subject,              // Subject line
        text: text,                    // Plain text body
    };

    try {
        // Sending the email asynchronously
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

module.exports = sendEmail;
