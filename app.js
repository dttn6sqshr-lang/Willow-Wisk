const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

/* ======================
   IMPORT BOT (IMPORTANT)
   ====================== */
require("./index.js");

/* ======================
   SESSION
====================== */

app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* ======================
   HOME PAGE ROUTE
====================== */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* ======================
   TEST ROUTE (IMPORTANT DEBUG)
====================== */

app.get("/test", (req, res) => {
  res.send("Website is working 🧁");
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});