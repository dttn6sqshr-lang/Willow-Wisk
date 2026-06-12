const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = 25414;

// WEBSITE
app.get("/", (req, res) => {
  res.send(`
<html>
<head>
  <title>Willow Wisk</title>

  <style>
    body{
      margin:0;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #F7F2EA, #7C9D96, #A8BFA3);
      min-height:100vh;
      color:#4b3a2f;
    }

    .hero{
      text-align:center;
      padding-top:80px;
    }

    .hero h1{
      font-size:52px;
      margin:0;
    }

    .cards{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
      gap:25px;
      margin-top:60px;
    }

    .card{
      width:220px;
      padding:25px;
      border-radius:18px;
      background: rgba(255,255,255,0.22);
      backdrop-filter: blur(18px);
      text-align:center;
      transition:0.3s;
      cursor:pointer;
    }

    .card:hover{
      transform: translateY(-6px);
    }

    a{
      text-decoration:none;
      color:#4b3a2f;
      font-weight:bold;
    }

    .small{
      font-size:13px;
      opacity:0.8;
      margin-top:10px;
    }

  </style>
</head>

<body>

  <div class="hero">
    <h1>Willow Wisk</h1>
    <p>All-in-One Discord Server Manager</p>
  </div>

  <div class="cards">

    <div class="card">
      <h3>Bot Status</h3>
      <p>Check if Willow Wisk is online and stable.</p>
      <div class="small"><a href="/status">View Status</a></div>
    </div>

    <div class="card">
      <h3>Activity</h3>
      <p>See recent actions, logs, and updates.</p>
      <div class="small"><a href="/activity">View Activity</a></div>
    </div>

    <div class="card">
      <h3>Login</h3>
      <p>Access your server dashboard.</p>
      <div class="small"><a href="/login">Login with Discord</a></div>
    </div>

    <div class="card">
      <h3>Add to Discord</h3>
      <p>Invite Willow Wisk to your server.</p>
      <div class="small"><a href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands">Invite Bot</a></div>
    </div>

  </div>

</body>
</html>
  `);
});

app.get("/status", (req, res) => {
  res.send(`
  <h1>Bot Status</h1>
  <p>Willow Wisk is currently online and running.</p>
  <a href="/">Back</a>
  `);
});

app.get("/activity", (req, res) => {
  res.send(`
  <h1>Activity</h1>
  <p>No recent activity yet.</p>
  <a href="/">Back</a>
  `);
});

app.get("/login", (req, res) => {
  res.send(`
  <h1>Login</h1>
  <p>Discord OAuth system will be added soon.</p>
  <a href="/">Back</a>
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