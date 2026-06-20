const express = require("express");
const session = require("express-session");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

require("./index.js");

/* ======================
   DISCORD OAUTH CONFIG
====================== */

const CLIENT_ID = "1514467728390623343";
const CLIENT_SECRET = "wkn52DREW39kMHACbCRFPmnH1FZzh6Db";
const REDIRECT_URI = "https://willowwisk.apps.bot-hosting.cloud/callback";

/* ======================
   SESSION
====================== */

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

app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* ======================
   FEATURES
====================== */

app.get("/features.html", (req, res) => {
  res.sendFile(path.join(__dirname, "features.html"));
});

/* ======================
   DASHBOARD (PROTECTED)
====================== */

app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

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
   DISCORD LOGIN
====================== */

app.get("/auth/discord", (req, res) => {
  const url =
    `https://discord.com/api/oauth2/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=identify%20guilds`;

  res.redirect(url);
});

/* ======================
   OAUTH CALLBACK
====================== */

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) return res.redirect("/error.html");

  try {
    const tokenRes = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    req.session.user = userRes.data;

    res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.redirect("/error.html");
  }
});

/* ======================
   STATS API
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats);
});

/* ======================
   GUILDS API (REAL BOT SERVERS)
====================== */

const { client } = require("./index.js");

app.get("/api/guilds", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const guilds = client.guilds.cache.map(g => ({
    id: g.id,
    name: g.name,
    members: g.memberCount || 0,
    icon: g.icon
      ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`
      : null
  }));

  res.json(guilds);
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});