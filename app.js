const express = require("express");
const session = require("express-session");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 25414;

/* ======================
   SESSION SYSTEM
====================== */

app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("public"));

/* ======================
   DISCORD OAUTH SETUP
====================== */

const CLIENT_ID = "1514467728390623343";
const CLIENT_SECRET = "wkn52DREW39kMHACbCRFPmnH1FZzh6Db";
const REDIRECT_URI = "https://YOUR_DOMAIN/callback";

/* ======================
   ROUTES
====================== */

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* LOGIN REDIRECT */
app.get("/auth/discord", (req, res) => {
  const url =
    `https://discord.com/api/oauth2/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code&scope=identify%20guilds`;

  res.redirect(url);
});

/* CALLBACK */
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const tokenRes = await axios.post(
    "https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  const userRes = await axios.get(
    "https://discord.com/api/users/@me",
    {
      headers: {
        Authorization: `Bearer ${tokenRes.data.access_token}`
      }
    }
  );

  req.session.user = userRes.data;

  res.redirect("/");
});

/* USER API */
app.get("/api/user", (req, res) => {
  res.json({
    loggedIn: !!req.session.user,
    user: req.session.user || null
  });
});

/* GUILDS API (server picker later) */
app.get("/api/guilds", async (req, res) => {
  if (!req.session.user) return res.json([]);

  const token = req.session.user.access_token;

  const guilds = await axios.get(
    "https://discord.com/api/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  // only Manage Server permission (0x20)
  const filtered = guilds.data.filter(g =>
    (g.permissions & 0x20) === 0x20
  );

  res.json(filtered);
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});