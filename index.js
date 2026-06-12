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
      <body style="font-family: Arial; text-align:center; padding-top:50px;">
        <h1>Willow Wisk Dashboard</h1>
        <p>Status: Online</p>
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