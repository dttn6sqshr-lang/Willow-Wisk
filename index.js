const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

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
  res.json({
    ready: client.isReady(),
    botName: client.user ? client.user.username : "Loading...",
    guilds: client.guilds.cache.size,
    ping: client.ws.ping
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