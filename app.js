const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 25414;

require("./index.js");

app.use(express.static(__dirname)); // <-- IMPORTANT (serves ALL files directly)

app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* ======================
   LOGIN CHECK
====================== */

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/error.html");
  }
  next();
}

/* ======================
   LOGIN
====================== */

app.get("/auth/discord", (req, res) => {
  req.session.user = { id: "temp", username: "User" };
  res.redirect("/dashboard.html");
});

/* ======================
   DASHBOARD PROTECTION
====================== */

app.get("/dashboard.html", requireLogin, (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

/* ======================
   HOME
====================== */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

/* ======================
   ERROR
====================== */

app.get("/error.html", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});

/* ======================
   START
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});