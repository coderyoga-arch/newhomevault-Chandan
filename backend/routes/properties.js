const express = require("express");
const router = express.Router();
const { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");
const { requireAuth } = require("../middleware/auth");

// Public endpoints
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Guarded admin endpoints
router.post("/", requireAuth, createProperty);
router.put("/:id", requireAuth, updateProperty);
router.delete("/:id", requireAuth, deleteProperty);

module.exports = router;
