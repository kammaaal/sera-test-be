// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//     },
//     debug: true,
//     logger: true
// });

// // console.log("data email: ", transporter.auth.user)
// const sendEmail = async ({ to, subject, text }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USERNAME,
//       to,
//       subject,
//       text,
//     });
//     console.log('Email sent:', info.messageId);
//   } catch (error) {
//     console.error('Failed to send email:', error.message);
//   }
// };

const mailgun = require('mailgun-js');

// Konfigurasi Mailgun menggunakan environment variables
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendEmail = async (to, subject, text) => {
  const data = {
    from: process.env.MAILGUN_FROM_EMAIL,
    to,
    subject,
    text,
  };

  try {
    const result = await mg.messages().send(data);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error.message);
    throw new Error('Email sending failed');
  }
};

module.exports = { sendEmail };
