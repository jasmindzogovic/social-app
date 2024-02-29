const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (verificationString, userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const emailOptions = {
      from: process.env.NODEMAILER_ADMIN,
      to: `${userEmail}`,
      subject: "Verification email from Social App",
      text: `Please click the following link to activate your account: http://127.0.0.1:8000/api/v1/users/${verificationString}`,
    };

    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};
