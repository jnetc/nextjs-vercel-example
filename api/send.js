const sgMail = require('@sendgrid/mail');

export default async function sendgrid(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, message } = req.body;

  const content = {
    to: process.env.SEND_TO,
    from: email,
    subject: `New Message From - ${email}`,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(content);
    console.log(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
}
