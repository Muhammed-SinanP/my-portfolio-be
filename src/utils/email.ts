import nodemailer from "nodemailer";

export const sendEmail = async (
  name: string,
  emailId: string,
  subject: string,
  msg: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });
  const text = `Message from ${name} ${emailId} \n\n \t${msg}`;
  await transporter.sendMail({
    replyTo: emailId,
    to: process.env.ADMIN_EMAIL,
    subject,
    text,
  });
};
