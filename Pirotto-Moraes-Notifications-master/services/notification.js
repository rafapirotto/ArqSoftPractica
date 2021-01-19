const nodemailer = require("nodemailer");

class NotificationService {
    constructor() {}

    async sendEmail(emailObj) {
        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: process.env.MAIL_DOMAIN,
            secure: false,
            auth: {
                user: `${process.env.MAIL_USER}@${process.env.MAIL_DOMAIN}.com`,
                pass: process.env.MAIL_PASS,
            },
        });
        // Definimos el email
        var mailOptions = {
            from: `Obligatorio Arquitectura <${process.env.MAIL_USER}@${process.env.MAIL_DOMAIN}.com>`,
            to: emailObj.to,
            subject: emailObj.subject,
            text: emailObj.content,
        };
        // Enviamos el email con nodemailer
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw Error(error);
            } else {
                console.log("Email sent");
            }
        });
    }
}

module.exports = NotificationService;
