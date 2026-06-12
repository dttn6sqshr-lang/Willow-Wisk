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
  font-family: Trebuchet MS, sans-serif;
  background: linear-gradient(135deg, #F7F2EA, #7C9D96, #A8BFA3);
  min-height:100vh;
  color:#4b3a2f;
}

      .navbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:20px 40px;
      }

      .left-nav{
        display:flex;
        gap:35px;
        font-size:22px;
      }

.login{
  padding:12px 28px;
  border-radius:999px;
  border:1px solid white;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(20px);
  cursor:pointer;
  transition:0.3s;
}

.login:hover{
  transform:scale(1.05);
}

      .hero{
        text-align:center;
        margin-top:100px;
      }

      .hero h1{
        font-size:55px;
      }

      .discord{
  margin-top:20px;
  display:inline-block;
  padding:14px 35px;
  border-radius:999px;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(20px);
  cursor:pointer;
  transition:0.3s;
}

.discord:hover{
  transform:scale(1.05);
}

      .why{
        margin-top:120px;
        text-align:center;
      }

      .cards{
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        gap:30px;
        margin-top:40px;
      }

      .card{
  width:260px;
  padding:25px;
  border-radius:22px;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(18px);
  transition:0.3s;
  cursor:pointer;
}

.card:hover{
  transform: translateY(-6px);
}

      .learn{
        margin-top:20px;
      }
    </style>
  </head>

  <body>

    <div class="navbar">

  <div class="left-nav">
  <div><a href="/">⾕</a></div>
  <div><a href="/docs">📒</a></div>
  <div><a href="/health">ﮩ٨ـ</a></div>
  <div><a href="/activity">◔</a></div>
</div>

      <div class="login">
        Login
      </div>

    </div>

    <div class="hero">
      <h1>Willow Wisk</h1>
      <p>All-In-One Server Management</p>

      <div class="discord">
        Add To Discord
      </div>
    </div>

    <div class="why">

      <h2>Why Willow Wisk?</h2>

      <div class="cards">

        <div class="card">
          <h3>Reaction Roles</h3>
          <p>Create unlimited role menus for members.</p>
          <div class="learn">Learn More</div>
        </div>

        <div class="card">
          <h3>Ticket Panels</h3>
          <p>Build custom ticket systems for your server.</p>
          <div class="learn">Learn More</div>
        </div>

        <div class="card">
          <h3>Verification</h3>
          <p>Approve or deny members with staff review.</p>
          <div class="learn">Learn More</div>
        </div>

        <div class="card">
          <h3>Automod</h3>
          <p>Protect your server from raids and spam.</p>
          <div class="learn">Learn More</div>
        </div>

      </div>
    </div>

  </body>
  </html>
  `);
});

app.get("/docs", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Documentation</title>
  </head>

  <body style="font-family:Arial; margin:0; display:flex;">

    <!-- SIDEBAR -->
    <div style="width:250px; height:100vh; background:#F7F2EA; padding:20px;">

      <h2>📒 Docs</h2>

      <a href="/docs">Home</a><br><br>
      <a href="/docs/get-started">Get Started</a><br><br>
      <a href="/docs/config">Config</a><br><br>
      <a href="/docs/automod">Automod</a><br><br>
      <a href="/docs/embeds">Embeds</a><br><br>
      <a href="/docs/fun">Fun</a><br><br>
      <a href="/docs/economy">Economy</a><br><br>

    </div>

    <!-- MAIN -->
    <div style="flex:1; padding:40px; background:#EAF4F1;">

      <h1>Willow Wisk Documentation</h1>

      <p>Welcome to the official documentation for Willow Wisk.</p>

      <p>This bot helps manage your server with tickets, moderation, reaction roles, logging, economy and more.</p>

      <br>

      <a href="/docs/get-started" 
         style="padding:12px 20px; background:#A8BFA3; color:white; border-radius:10px; text-decoration:none;">
         Get Started →
      </a>

    </div>

  </body>
  </html>
  `);
});

app.get("/docs/get-started", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Get Started</title>
  </head>

  <body style="font-family:Arial; margin:0; display:flex;">

    <!-- SIDEBAR -->
    <div style="width:250px; height:100vh; background:#F7F2EA; padding:20px;">

      <h2>📒 Docs</h2>

      <a href="/docs">Home</a><br><br>
      <a href="/docs/get-started">Get Started</a><br><br>
      <a href="/docs/config">Config</a><br><br>
      <a href="/docs/automod">Automod</a><br><br>
      <a href="/docs/embeds">Embeds</a><br><br>
      <a href="/docs/fun">Fun</a><br><br>
      <a href="/docs/economy">Economy</a><br><br>

    </div>

    <!-- MAIN -->
    <div style="flex:1; padding:40px; background:#EAF4F1;">

      <h1>Get Started</h1>

      <p>Welcome! This guide will help you set up Willow Wisk.</p>

      <h3>Basic Setup</h3>
      <ul>
        <li>Bot uses / commands by default</li>
        <li>You can also set a custom prefix</li>
        <li>Supports reaction roles, tickets, logs, welcome messages</li>
      </ul>

      <h3>Prefix System</h3>
      <p>You can use slash commands OR set your own prefix per server.</p>

      <h3>Channels</h3>
      <p>Configure log channels for moderation, tickets, and system messages.</p>

      <h3>Core Features</h3>
      <ul>
        <li>Reaction Roles</li>
        <li>Moderation Tools</li>
        <li>Logging System</li>
        <li>Welcome Messages</li>
        <li>Ticket System</li>
      </ul>

    </div>

  </body>
  </html>
  `);
});

app.get("/docs/config", (req, res) => {
  res.send(`
  <html>
  <body style="font-family:Arial; padding:40px; background:#F7F2EA;">

    <h1>⚙️ Configuration</h1>

    <h3>Commands</h3>
    <p>Supports slash commands and optional prefix commands.</p>

    <h3>Prefix Setup</h3>
    <p>Admins can set a custom prefix per server.</p>

    <h3>Systems</h3>
    <ul>
      <li>Tickets</li>
      <li>Moderation Logs</li>
      <li>Welcome Messages</li>
      <li>Reaction Roles</li>
    </ul>

  </body>
  </html>
  `);
});

app.get("/docs/automod", (req, res) => {
  res.send("<h1>Automod</h1><p>Protects your server from spam, raids, and bad words.</p>");
});

app.get("/docs/embeds", (req, res) => {
  res.send("<h1>Embeds</h1><p>Create custom embeds for announcements, rules, and tickets.</p>");
});

app.get("/docs/fun", (req, res) => {
  res.send("<h1>Fun</h1><p>Includes games, XP systems, and interactive commands.</p>");
});

app.get("/docs/economy", (req, res) => {
  res.send("<h1>Economy</h1><p>Users earn points, rewards, and server perks.</p>");
});

app.get("/health", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Bot Health</title>
  </head>

  <body style="font-family:Arial; padding:40px; background:#EAF4F1;">

    <h1>ﮩ٨ـ Bot Status</h1>

    <p>Status: Online</p>
    <p>Latency: Stable</p>
    <p>Discord Connection: Active</p>

    <br>
    <a href="/">← Back Home</a>

  </body>
  </html>
  `);
});

app.get("/activity", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Activity</title>
  </head>

  <body style="font-family:Arial; padding:40px; background:#F7F2EA;">

    <h1>◔ Recent Activity</h1>

    <p>No activity logs yet.</p>

    <ul>
      <li>Tickets created: 0</li>
      <li>Verifications: 0</li>
      <li>Commands used: 0</li>
    </ul>

    <br>
    <a href="/">← Back Home</a>

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