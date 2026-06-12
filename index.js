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
        border:1px solid #F7F2EA;
        background: rgba(255,255,255,0.18);
        backdrop-filter: blur(14px);
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
        padding:14px 30px;
        border-radius:999px;
        background: rgba(255,255,255,0.18);
        backdrop-filter: blur(14px);
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
        border-radius:20px;
        background: rgba(255,255,255,0.18);
        backdrop-filter: blur(14px);
      }

      .learn{
        margin-top:20px;
      }
    </style>
  </head>

  <body>

    <div class="navbar">

      <div class="left-nav">
        <div>⾕</div>
        <div>📒</div>
        <div>ﮩ٨ـ</div>
        <div>◔</div>
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