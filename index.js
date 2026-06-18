const express = require("express");
const session = require("express-session");
const axios = require("axios");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 25414;

/* =========================
   DISCORD BOT
========================= */

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

const startTime = Date.now();

/* =========================
   ACTIVITY SYSTEM
========================= */

let activityLog = [];

function addActivity(text) {
  activityLog.unshift({
    text,
    time: Date.now()
  });

  if (activityLog.length > 20) activityLog.pop();
}

/* =========================
   BOT EVENTS
========================= */

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  addActivity("Bot started");
});

client.on("guildCreate", guild => {
  addActivity(`Joined server: ${guild.name}`);
});

client.on("guildDelete", guild => {
  addActivity(`Left server: ${guild.name}`);
});

/* =========================
   EXPRESS SETUP
========================= */

app.use(express.static("public"));

app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* =========================
   STATUS API
========================= */

app.get("/api/status", (req, res) => {
  const uptime = Date.now() - startTime;

  const hours = Math.floor(uptime / 3600000);
  const days = Math.floor(hours / 24);

  res.json({
    online: client.isReady(),
    ping: client.ws.ping || 0,
    servers: client.guilds.cache.size || 0,
    users: client.guilds.cache.reduce((a, g) => a + (g.memberCount || 0), 0),
    uptime: `${days}d ${hours % 24}h`
  });
});

/* =========================
   ACTIVITY API
========================= */

app.get("/api/activity", (req, res) => {
  res.json(activityLog);
});

/* =========================
   DISCORD OAUTH
========================= */

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:25414/callback";

app.get("/auth/discord", (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const tokenRes = await axios.post(
    "https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
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

  addActivity(`User logged in: ${userRes.data.username}`);

  res.redirect("/");
});

/* =========================
   LOGIN CHECK
========================= */

app.get("/api/user", (req, res) => {
  res.json({
    loggedIn: !!req.session.user,
    user: req.session.user || null
  });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`Website running on ${PORT}`);
});

/* =========================
   BOT LOGIN
========================= */

client.login(process.env.TOKEN);