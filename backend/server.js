require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter connection error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

// Lead Submission Endpoint
app.post("/api/leads", async (req, res) => {
  const { name, email, phone, interest, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const mailOptions = {
    from: `"NewHomeVault Leads" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New Lead: ${name} - ${interest || "General Inquiry"}`,
    html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Interest:</strong> ${interest || "General Inquiry"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
      <hr />
      <p>This inquiry was sent from NewHomeVault.com</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully for lead: ${email}`);
    res.status(200).json({ message: "Inquiry sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send inquiry. Please try again later." });
  }
});

app.get("/", (req, res) => {
  res.send("NewHomeVault Lead API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
