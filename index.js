const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = 25414;

// WEBSITE
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Willow Wisk Dashboard</title>
      </head>

      <body style="font-family: Arial; padding: 40px;">

        <h1>Willow Wisk Dashboard</h1>

        <hr>

        <h3>Navigation</h3>

        <a href="/dashboard">Dashboard</a>
        <br><br>

        <a href="/tickets">Tickets</a>
        <br><br>

        <a href="/verification">Verification</a>
        <br><br>

        <a href="/settings">Settings</a>

      </body>
    </html>
  `);
});

// BOT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// START WEBSITE
app.listen(PORT, () => {
  console.log(`Dashboard running on port ${PORT}`);
});

// START BOT
client.login(process.env.TOKEN);