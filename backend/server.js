require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing Middleware Mappings
app.use("/api/properties", require("./routes/properties"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/upload", require("./routes/upload"));

app.get("/", (req, res) => {
  res.send("NewHomeVault Core API Server is active...");
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server initialized successfully. Running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\nCRITICAL ERROR: Port ${PORT} is already in use by another process!`);
    console.error("Please terminate the existing process or choose a different port in backend/.env.");
  } else {
    console.error("\nServer error during startup:", err);
  }
});
