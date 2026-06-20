const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 25414;

/* bot import */
require("./index.js");

/* IMPORTANT:
   DO NOT serve all files automatically
   (this was breaking dashboard)
*/

/* session */
app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* login check */
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/error.html");
  }
  next();
}

/* ======================
   HOME
====================== */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

/* ======================
   FEATURES PAGE
====================== */

app.get("/features.html", (req, res) => {
  res.sendFile(__dirname + "/features.html");
});

/* ======================
   STYLE FILE
====================== */

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

/* ======================
   LOGIN
====================== */

app.get("/auth/discord", (req, res) => {
  req.session.user = {
    id: "temp",
    username: "User"
  };

  res.redirect("/dashboard");
});

/* ======================
   DASHBOARD (PROTECTED)
====================== */

app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

/* ======================
   ERROR PAGE
====================== */

app.get("/error.html", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});

/* ======================
   STATS API (RESTORED)
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats);
});

/* ======================
   START
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});