const nodemailer = require("nodemailer");

const sendMail = async function (options) {
    // 1) Create trasporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        logger: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    // 2) DEFINE EMAIL OPTIONS
    const mailOptions = {
        from: "Batch 15 Application",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };
    //   3) Actually send the email
    console.log("now sending");
    await transporter.sendMail(mailOptions);
    console.log("sent");
};

module.exports = sendMail;
