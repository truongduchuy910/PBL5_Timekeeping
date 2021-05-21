const nodemailer = require("nodemailer");

class Mail {
  static transporter = false;
  constructor({ user, pass }) {
    if (!Mail.transporter) {
      Mail.transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
          user,
          pass,
        },
      });
    }
  }

  static async send({ from, to, subject, text, html }) {
    return await Mail.transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  }
}
module.exports = Mail;
