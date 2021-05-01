require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(email, code) {
  try {

    var subject = "Verify your email";

    // The body of the email for recipients
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;

    const msg = {
      to: email,
      from: 'dydi_1234@hotmail.fr', // Use the email address or domain you verified above
      subject: subject,
      text: 'and easy to do anywhere, even with Node.js',
      html: body_html,
    };

    await sgMail.send(msg);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

module.exports = { sendEmail };