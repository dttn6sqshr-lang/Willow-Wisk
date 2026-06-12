const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = 25414;

// WEBSITE
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Willow Wisk</title>

  <style>
    body {
      margin: 0;
      height: 100vh;
      font-family: Arial, sans-serif;
      overflow: hidden;

      /* bakery gradient */
      background: linear-gradient(135deg, #F7F2EA, #A8BFA3, #7C9D96);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5a4638;
    }

    /* soft floating particles */
    .bg-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 60%);
      pointer-events: none;
    }

    .container {
      text-align: center;
      z-index: 2;
      width: 90%;
      max-width: 600px;
    }

    .mascot {
      font-size: 70px;
      animation: float 3s ease-in-out infinite;
      margin-bottom: 10px;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }

    h1 {
      margin: 0;
      font-size: 42px;
      font-weight: bold;
    }

    p {
      margin-top: 10px;
      opacity: 0.8;
    }

    .grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .card {
      background: rgba(255,255,255,0.25);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      padding: 18px;
      cursor: pointer;
      transition: 0.3s;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      text-decoration: none;
      color: #5a4638;
    }

    .card:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.35);
    }

    .full {
      grid-column: span 2;
    }

    .title {
      font-weight: bold;
      font-size: 18px;
    }

    .desc {
      font-size: 13px;
      opacity: 0.8;
      margin-top: 5px;
    }

  </style>
</head>

<body>

<div class="bg-glow"></div>

<div class="container">

  <div class="mascot">🧁</div>

  <h1>Willow Wisk</h1>
  <p>Your cozy Discord helper for servers, tickets, moderation & more</p>

  <div class="grid">

    <a class="card" href="/status">
      <div class="title">Status</div>
      <div class="desc">Check if the bot is online</div>
    </a>

    <a class="card" href="/activity">
      <div class="title">Activity</div>
      <div class="desc">View recent bot logs</div>
    </a>

    <a class="card" href="/login">
      <div class="title">Login</div>
      <div class="desc">Access your dashboard</div>
    </a>

    <a class="card full" href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands">
      <div class="title">Add to Discord</div>
      <div class="desc">Invite Willow Wisk to your server</div>
    </a>

  </div>

</div>

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