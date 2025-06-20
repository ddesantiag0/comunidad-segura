const twilio = require("twilio");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

exports.handler = async (event, context) => {
  try {
    const { name, phone, contacts } = JSON.parse(event.body);

    if (!contacts || !Array.isArray(contacts)) {
      throw new Error("Missing or invalid contacts array");
    }

    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    await Promise.all(
      contacts.map((c) =>
        client.messages.create({
          to: c.phone,
          from: process.env.TWILIO_PHONE,
          body: `🚨 Emergency alert from Comunidad Segura.\n\nSent by: ${name}\nStay safe.`
        })
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("Twilio send error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Failed to send alerts" })
    };
  }
};
