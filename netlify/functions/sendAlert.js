const twilio = require('twilio');

exports.handler = async function(event, context) {
  const { name, phone } = JSON.parse(event.body);

  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

  try {
    await client.messages.create({
      to: phone,
      from: process.env.TWILIO_NUMBER,
      body: `🚨 Emergency alert from Comunidad Segura.\n\nSent by: ${name}\nStay safe.`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
