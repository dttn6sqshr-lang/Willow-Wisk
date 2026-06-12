const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();

// IMPORTANT: use platform port, NOT fixed number
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`
    <h1>Willow Wisk Dashboard</h1>
    <p>Status: Online</p>
  `);
});

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

// START WEB SERVER
app.listen(PORT, () => {
  console.log("Web server running on port", PORT);
});

// START BOT
client.login(process.env.TOKEN);