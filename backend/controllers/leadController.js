const { leadService } = require("../services/supabaseService");
const nodemailer = require("nodemailer");

// Nodemailer Transporter Setup for Admin Notifications
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Verify mail settings on startup
transporter.verify((error) => {
  if (error) {
    console.warn("Mail Transporter connection warning (Leads Controller):", error.message);
  } else {
    console.log("Mail Transporter is ready to dispatch lead notifications.");
  }
});

const getLeads = async (req, res) => {
  try {
    const data = await leadService.fetchAll();
    res.status(200).json(data);
  } catch (err) {
    console.error("Get Leads Error:", err);
    res.status(500).json({ error: "Failed to retrieve lead logs." });
  }
};

const createLead = async (req, res) => {
  const { name, email, phone, interest, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields (name, email, message) are missing." });
  }

  try {
    // 1. Persist the lead in Supabase database
    const savedLead = await leadService.create(req.body);

    // 2. Dispatch the Nodemailer notification (Asynchronous / Non-blocking)
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
        <p>This inquiry was logged in Supabase and sent from NewHomeVault.com</p>
      `,
    };

    transporter.sendMail(mailOptions, (mailErr) => {
      if (mailErr) {
        console.error("Failed to send lead email notification:", mailErr);
      } else {
        console.log(`Email notification successfully dispatched for: ${email}`);
      }
    });

    res.status(201).json(savedLead);
  } catch (err) {
    console.error("Create Lead Error:", err);
    res.status(500).json({ error: "Failed to submit inquiry. Please try again." });
  }
};

const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status value is required." });
  }

  try {
    const updated = await leadService.updateStatus(id, status);
    res.status(200).json(updated);
  } catch (err) {
    console.error(`Update Lead (${id}) Status Error:`, err);
    res.status(500).json({ error: "Failed to update lead status." });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLeadStatus,
};
