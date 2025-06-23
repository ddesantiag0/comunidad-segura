const twilio = require("twilio");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

exports.handler = async (event, context) => {
  try {
    const { name, contacts, location } = JSON.parse(event.body);

    if (!contacts || !Array.isArray(contacts)) {
      throw new Error("Missing or invalid contacts array");
    }

    const locationMsg =
      location?.lat && location?.lng
        ? `Location: https://maps.google.com/?q=${location.lat},${location.lng}`
        : "Location: not available.";

    const message = `🚨 Emergency alert from Comunidad Segura.\n\nSent by: ${name}\n${locationMsg}\nStay safe.`;

    await Promise.all(
      contacts.map((c) =>
        client.messages.create({
          to: c.phone,
          from: fromPhone,
          body: message
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
