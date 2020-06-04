const axios = require("axios");
const config = require("config");

function sendEmail(
  toEmail,
  toName,
  subject,
  fromEmail,
  fromName,
  contentValue
) {
  try {
    axios({
      method: "post",
      url: "https://api.sendgrid.com/v3/mail/send",
      headers: {
        Authorization: `Bearer ${config.get("sgApiKey")}`,
      },
      data: {
        personalizations: [
          {
            to: [
              {
                email: toEmail,
                name: toName,
              },
            ],
            subject: subject,
          },
        ],
        from: {
          email: fromEmail,
          name: fromName,
        },
        content: [{ type: "text/html", value: contentValue }],
      },
    });
  } catch (e) {
    console.log(e);
  }

  console.log("end");
}

module.exports = sendEmail;
