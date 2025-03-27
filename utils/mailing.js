import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASS
  }
});

/**
 * @param {string} to - Recipient's address
 * @param {string} subject - email subject
 * @param {string} html - email content
 */

export const sendEmail = async (to, subject, html) => {
  try {
    const send = await transporter.sendMail({
      from: `"EasyBuy" <${process.env.HOST_EMAIL}>`,
      to: to,
      subject: subject,
      html: html
    });
    return send;
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};