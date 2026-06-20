const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

require("./index.js");

app.use(express.static(__dirname));

app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* ======================
   LOGIN MIDDLEWARE
====================== */

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
  res.sendFile(path.join(__dirname, "home.html"));
});

/* ======================
   TEMP LOGIN (CLICK LOGIN)
====================== */

app.get("/auth/discord", (req, res) => {
  req.session.user = {
    id: "temp",
    username: "User"
  };

  res.redirect("/dashboard.html");
});

/* ======================
   DASHBOARD (PROTECTED)
====================== */

app.get("/dashboard.html", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

/* ======================
   ERROR PAGE
====================== */

app.get("/error.html", (req, res) => {
  res.sendFile(path.join(__dirname, "error.html"));
});

/* ======================
   STATS API (KEEP FOR BOT)
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats || {});
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});