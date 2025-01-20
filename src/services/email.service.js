const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
};

module.exports = { sendEmail };
