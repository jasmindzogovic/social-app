const nodemailer = require("nodemailer");

exports.sendEmail = async (textContent, userEmail, subject) => {
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
      subject,
      text: `${textContent}`,
    };

    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};
