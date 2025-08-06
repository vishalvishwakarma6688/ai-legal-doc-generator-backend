const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"AI Legal Docs" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Verification OTP",
        html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #4CAF50; text-align: center;">Welcome to AI Legal Docs</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">
        Thank you for signing up! To complete your registration and start using our services, 
        please verify your email address using the OTP below:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; font-size: 24px; border-radius: 5px; letter-spacing: 3px;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 14px; color: #555; text-align: center;">
        This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.
      </p>
      <p style="font-size: 14px; color: #777;">
        If you didn’t create an account with us, you can safely ignore this email.
      </p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} AI Legal Docs. All rights reserved.
      </p>
    </div>
  </div>
`

    });
};

module.exports = { sendOTPEmail };
