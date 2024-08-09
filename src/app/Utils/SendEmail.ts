import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'iammehedi296@gmail.com',
      pass: 'fqey pcei tgvo sfxf',
    },
  });

  await transporter.sendMail({
    from: 'iammehedi296@gmail.com', // sender address
    to, // list of receivers
    subject: 'Email Verification',
    text: `Your verification code is: ${code}`,
  });
};

export default sendEmail;
