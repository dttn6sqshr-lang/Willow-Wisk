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

  background: linear-gradient(135deg, #F7F2EA, #A8BFA3, #7C9D96);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5a4638;
}

/* smoother floating background glow */
.bg-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center,
    rgba(255,255,255,0.18),
    transparent 60%);
  animation: glowShift 10s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes glowShift {
  0% { transform: scale(1) translateY(0px); opacity: 0.7; }
  100% { transform: scale(1.1) translateY(-10px); opacity: 1; }
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
  0% {
    transform: translateY(0px);
    filter: drop-shadow(0 10px 18px rgba(0,0,0,0.12));
  }
  50% {
    transform: translateY(-6px);
    filter: drop-shadow(0 18px 25px rgba(0,0,0,0.18));
  }
  100% {
    transform: translateY(0px);
    filter: drop-shadow(0 10px 18px rgba(0,0,0,0.12));
  }
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
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 18px;
  cursor: pointer;

  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              background 0.35s ease,
              box-shadow 0.35s ease;

  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  text-decoration: none;
  color: #5a4638;
  will-change: transform;
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255,255,255,0.32);
  box-shadow: 0 14px 35px rgba(0,0,0,0.12);
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

  <!-- ACTION LAYOUT -->
  <div style="
    margin-top:40px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:30px;
    flex-wrap:wrap;
  ">

    <!-- LEFT COLUMN -->
    <div style="display:flex; flex-direction:column; gap:15px;">

      <a class="card" href="/status">
        <div class="title">Status</div>
        <div class="desc">Check bot health</div>
      </a>

      <a class="card" href="/login">
        <div class="title">Login</div>
        <div class="desc">Access dashboard</div>
      </a>

    </div>

    <!-- CENTER MIXING BOWL -->
    <div style="
      font-size:70px;
      animation: float 3s ease-in-out infinite;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
    ">
      🥣
    </div>

    <!-- RIGHT COLUMN -->
    <div style="display:flex; flex-direction:column; gap:15px;">

      <a class="card" href="/activity">
        <div class="title">Activity</div>
        <div class="desc">View logs</div>
      </a>

      <a class="card" href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands">
        <div class="title">Add to Discord</div>
        <div class="desc">Invite the bot</div>
      </a>

    </div>

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