const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

const startTime = Date.now();

/* -----------------------------
   BOT CLIENT (discord.js)
------------------------------*/
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.login(process.env.TOKEN);

/* -----------------------------
   BASIC SERVER
------------------------------*/
app.use(express.json());

app.use(express.static(__dirname));

/* -----------------------------
   HOME
------------------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* -----------------------------
   STATUS API (REAL DATA)
------------------------------*/
app.get("/api/status", (req, res) => {
  const uptimeMs = Date.now() - startTime;

  const hours = Math.floor(uptimeMs / 3600000);
  const days = Math.floor(hours / 24);

  res.json({
    online: client.isReady(),

    ping: client.ws.ping || 0,

    servers: client.guilds.cache.size || 0,

    users: client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    ),

    container: "Running",

    uptime: days + "d " + (hours % 24) + "h"
  });
});

/* -----------------------------
   STATUS PAGE
------------------------------*/
app.get("/status", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* -----------------------------
   ACTIVITY PAGE
------------------------------*/
app.get("/activity", (req, res) => {
  res.send("Activity coming next 🥣");
});

/* -----------------------------
   START
------------------------------*/
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});