const nodemailer = require('nodemailer');
// stored in `.env` -- never store passwords, api keys
// etc. inside source code
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.emailer_userName,
        pass: process.env.emailer_password
    }
});
const sendEmail = (from, to, subject, html = '<b>Error sending email</b>' ) => {
  // setup email data with unicode symbols
  let mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html// html body
  }
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        return {success: false, data: error}
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return {success: true, data: `Message ${info.messageId} sent: ${info.response}`};
  });
}
module.exports = {sendEmail};
