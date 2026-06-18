const express = require("express");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 25414;

/* =========================
   DISCORD BOT (v14)
========================= */

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

const startTime = Date.now();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

/* =========================
   EXPRESS SETUP
========================= */

app.use(express.static("public"));

/* =========================
   HOME PAGE
========================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* =========================
   STATUS API (REAL DATA)
========================= */

app.get("/api/status", (req, res) => {
  const uptimeMs = Date.now() - startTime;

  const hours = Math.floor(uptimeMs / 3600000);
  const days = Math.floor(hours / 24);

  const totalUsers = client.guilds.cache.reduce(
    (acc, g) => acc + (g.memberCount || 0),
    0
  );

  res.json({
    online: client.isReady(),
    ping: client.ws.ping || 0,
    servers: client.guilds.cache.size || 0,
    users: totalUsers || 0,
    uptime: `${days}d ${hours % 24}h`
  });
});

/* =========================
   LOGIN PLACEHOLDER (PHASE 3 READY)
========================= */

app.get("/auth/discord", (req, res) => {
  // placeholder for now
  res.send("Discord OAuth will be added in Phase 3 🧁");
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`Website running on port ${PORT}`);
});

/* =========================
   BOT LOGIN
========================= */

client.login(process.env.TOKEN);