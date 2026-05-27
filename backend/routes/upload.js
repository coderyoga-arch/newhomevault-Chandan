const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadPhoto } = require("../controllers/uploadController");
const { requireAuth } = require("../middleware/auth");

// Multer memory uploader buffer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Guarded upload endpoint
router.post("/", requireAuth, upload.single("photo"), uploadPhoto);

module.exports = router;
