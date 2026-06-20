const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

const { client } = require("./index.js");

app.use(express.static(__dirname));

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
   HOME
====================== */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* ======================
   FAKE LOGIN (TEMP)
====================== */

app.get("/auth/discord", (req, res) => {
  req.session.user = { id: "temp", username: "User" };
  res.redirect("/dashboard");
});

/* ======================
   DASHBOARD
====================== */

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/error");
  }

  res.sendFile(path.join(__dirname, "dashboard.html"));
});

/* ======================
   ERROR PAGE
====================== */

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "error.html"));
});

/* ======================
   STATS API
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats || {});
});

/* ======================
   GUILDS API (REAL SERVERS)
====================== */

app.get("/api/guilds", (req, res) => {

  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const guilds = client.guilds.cache.map(g => ({
    id: g.id,
    name: g.name,
    icon: g.icon
      ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`
      : null,
    members: g.memberCount
  }));

  res.json(guilds);
});

/* ======================
   START
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});