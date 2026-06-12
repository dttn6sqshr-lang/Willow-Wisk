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

  <body style="font-family:Arial; padding:40px; background:#F7F2EA;">

    <h1>📒 Willow Wisk Documentation</h1>

    <p>Welcome to the bot documentation.</p>

    <h3>Getting Started</h3>
    <ul>
      <li>Invite the bot</li>
      <li>Set up tickets</li>
      <li>Configure verification</li>
    </ul>

    <br>
    <a href="/">← Back Home</a>

  </body>
  </html>
  `);
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