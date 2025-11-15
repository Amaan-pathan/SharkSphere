import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  try {
    const verificationUrl = `https://sharksphere.onrender.com/api/auth/verify-email/${token}`;
    
    await resend.emails.send({
      from: 'Entrepreneurship Club <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email - Entrepreneurship Club',
      html: `
        <h1>Welcome to Entrepreneurship Club!</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link will expire in 24 hours.</p>
      `
    });

    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};