import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const verificationUrl = `http://localhost:3000/api/auth/verify-email/${token}`;
  console.log(verificationUrl);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email - Entrepreneurship Club',
    html: `
      <h1>Welcome to Entrepreneurship Club!</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `
  });
};