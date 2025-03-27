require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");

const setup = require("./api/routes");

const app = express();
const port = process.env.PORT || 5000;
const dbUri = process.env.MONGO_URI;

// Middleware setup
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom logger format
logger.token("status-format", (req, res) => {
  const status = res.statusCode;
  if (status >= 200 && status < 300) {
    return "🟢"; // Success
  } else if (status >= 300 && status < 400) {
    return "🔵"; // Redirect
  } else {
    return "🔴"; // Error
  }
});
app.use(logger(":method :url :status-format :status :response-time ms"));

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Server is Up and Running!");
});

// MongoDB connection
mongoose
  .connect(dbUri)
  .then(() => console.log("Database Connected Successfully"))
  .catch((error) => {
    console.error("DB Connection Error:", error);
    process.exit(1);
  });

// Setup routes
setup(app);

// Start server
app.listen(port, () => {
  console.log(`Server Running on port http://localhost:${port}`);
});
