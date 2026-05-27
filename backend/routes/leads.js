const express = require("express");
const router = express.Router();
const { getLeads, createLead, updateLeadStatus } = require("../controllers/leadController");
const { requireAuth } = require("../middleware/auth");

// Public submission
router.post("/", createLead);

// Guarded admin listings
router.get("/", requireAuth, getLeads);
router.patch("/:id/status", requireAuth, updateLeadStatus);

module.exports = router;
