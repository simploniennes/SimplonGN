import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // true pour port 465, false sinon
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendContactNotification = async (contact, user) => {
  const mailOptions = {
    from: `"Site Contact" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `Nouveau message de ${user.nom}`,
    text: `
Utilisateur : ${user.nom} (${user.email})
Sujet : ${contact.sujet || '(aucun)'}
Message : ${contact.message}
    `,
  };
  await transporter.sendMail(mailOptions);
};

const sendAutoReply = async (contact, user) => {
  const mailOptions = {
    from: `"Site Contact" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Merci pour votre message",
    text: `Bonjour ${user.nom},\n\nNous avons bien reçu votre message et reviendrons vers vous rapidement.\n\nCordialement,\nL'équipe`,
  };
  await transporter.sendMail(mailOptions);
};

export { sendContactNotification, sendAutoReply };
