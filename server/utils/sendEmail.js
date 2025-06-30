// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const sendEmail = async (subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Website Order" <${process.env.EMAIL_USER}>`,
//     to: process.env.MOM_EMAIL,
//     subject,
//     text,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;



import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (subject, text) => {
  const mailOptions = {
    from: `"Order System" <${process.env.EMAIL_USER}>`,
    to: process.env.MOM_EMAIL,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
