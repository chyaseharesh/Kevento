
// app/utils/email.ts
import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      // host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      }
  });
  

    // Set up the email data
    const mailOptions = {
      from: `${process.env.INFO_EMAIL_NAME} <${process.env.INFO_EMAIL}>`, // Sender address
      to, // Receiver address
      subject, // Subject line
      html, // HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
