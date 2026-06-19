const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

/* BOT */
require("./index.js");

/* IMPORTANT: SERVE CSS/JS/IMAGES */
app.use(express.static(__dirname));

/* SESSION */
app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* HOME */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* TEST */
app.get("/test", (req, res) => {
  res.send("Website is working 🧁");
});

/* ======================
   STATS API
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats);
});

/* START */
app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});