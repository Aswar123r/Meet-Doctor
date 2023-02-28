const nodemailer = require("nodemailer")

let Transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, 
    auth: {
      user: process.env.MAIL_ADDRESS, 
      pass: process.env.MAIL_PASSWORD, 
    },
  })

const sendEmail = (targetEmail, Subject, emailText) => {
    const message = {
            from : 'Meet Doctor',
            to : targetEmail,
            subject : Subject,
            text : emailText,
        };

        return Transporter.sendMail(message);
}

module.exports = sendEmail