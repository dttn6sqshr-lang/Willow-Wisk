const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 25414;

/* =========================
   DISCORD BOT SETUP
========================= */
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`🧁 Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

/* =========================
   LIVE BOT STATS
========================= */
function getBotStats() {
  return {
    uptime: process.uptime(),
    ping: client.ws?.ping || 0,
    servers: client.guilds.cache.size,
    memory: (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
  };
}

/* =========================
   HOME PAGE
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Willow Wisk</title>

<style>
body{
  margin:0;
  height:100vh;
  font-family:Arial;
  display:flex;
  justify-content:center;
  align-items:center;
  background: linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  overflow:hidden;
  color:#4b3b2f;
}

body::before{
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 45px 45px;
  opacity:0.12;
  animation: move 25s linear infinite;
}

@keyframes move{
  from{transform:translateY(0);}
  to{transform:translateY(-300px);}
}

.card{
  width:520px;
  padding:50px;
  border-radius:32px;
  background:rgba(255,255,255,0.28);
  backdrop-filter:blur(18px);
  text-align:center;
  box-shadow:0 18px 50px rgba(0,0,0,0.12);
}

.cupcake{
  font-size:90px;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-10px);}
}

.title{
  font-size:48px;
  margin:10px 0 5px 0;
  font-weight:bold;
}

.subtitle{
  font-size:15px;
  opacity:0.75;
  margin-bottom:22px;
}

.bowl{
  font-size:65px;
  margin:10px 0 25px 0;
  opacity:0.9;
}

.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
}

.btn{
  padding:16px;
  border-radius:18px;
  text-decoration:none;
  color:white;
  background:#7C9D96;
  font-weight:500;
  transition:0.25s;
  display:block;
}

.btn:hover{
  transform:scale(1.06);
  background:#6f8f89;
}
</style>
</head>

<body>

<div class="card">

  <div class="cupcake">🧁</div>
  <div class="title">Willow Wisk</div>
  <div class="subtitle">A cozy bakery-style bot dashboard</div>

  <div class="bowl">🥣</div>

  <div class="grid">
    <a class="btn" href="/status">Status</a>
    <a class="btn" href="/activity">Activity</a>
    <a class="btn" href="/login">Login</a>
    <a class="btn" href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">
      Add to Discord
    </a>
  </div>

</div>

</body>
</html>
`);
});

/* =========================
   STATUS (LIVE DATA)
========================= */
app.get("/status", (req, res) => {

  const stats = getBotStats();

  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Status</title>

<style>
body{
  margin:0;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family:Arial;
  background: linear-gradient(135deg,#2f5f5f,#7C9D96,#A8BFA3);
  color:white;
}

.panel{
  width:650px;
  padding:35px;
  border-radius:28px;
  background:rgba(255,255,255,0.12);
  backdrop-filter:blur(18px);
  box-shadow:0 18px 50px rgba(0,0,0,0.25);
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.title{
  font-size:26px;
  font-weight:bold;
}

.light{
  width:14px;
  height:14px;
  border-radius:50%;
  background:#4ade80;
  box-shadow:0 0 15px #4ade80;
  animation:pulse 2s infinite;
}

@keyframes pulse{
  0%{transform:scale(1);}
  50%{transform:scale(1.4);}
  100%{transform:scale(1);}
}

.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}

.card{
  background:rgba(255,255,255,0.15);
  padding:14px;
  border-radius:16px;
}
</style>
</head>

<body>

<div class="panel">

  <div class="header">
    <div class="title">🧁 Willow Wisk Status</div>
    <div class="light"></div>
  </div>

  <div class="grid">

    <div class="card">⏱ Uptime: ${Math.floor(stats.uptime)}s</div>
    <div class="card">📡 Ping: ${stats.ping}ms</div>

    <div class="card">🖥 Servers: ${stats.servers}</div>
    <div class="card">💾 Memory: ${stats.memory} MB</div>

    <div class="card">🟢 Status: Online</div>

  </div>

</div>

</body>
</html>
`);
});

/* =========================
   ACTIVITY PAGE
========================= */
app.get("/activity", (req, res) => {
  res.send(`
  <body style="margin:0;height:100vh;display:flex;justify-content:center;align-items:center;
  font-family:Arial;background:linear-gradient(135deg,#8B6F5A,#F7F2EA,#A8BFA3);">

  <div style="padding:50px;border-radius:20px;background:rgba(255,255,255,0.25);
  backdrop-filter:blur(12px);text-align:center;">
    <h1>📊 Activity</h1>
    <p>Logs coming soon</p>
    <a href="/">Back</a>
  </div>

  </body>
  `);
});

/* =========================
   LOGIN PAGE
========================= */
app.get("/login", (req, res) => {
  res.send(`
  <body style="margin:0;height:100vh;display:flex;justify-content:center;align-items:center;
  font-family:Arial;background:linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);">

  <div style="padding:40px;border-radius:20px;background:rgba(255,255,255,0.25);
  backdrop-filter:blur(12px);text-align:center">

    <div style="font-size:60px">🥐</div>
    <h2>Login</h2>

    <a href="/auth/discord" style="padding:12px 18px;background:#7C9D96;
    color:white;text-decoration:none;border-radius:12px;">
    Continue with Discord
    </a>

  </div>
  </body>
  `);
});

/* =========================
   DISCORD AUTH
========================= */
app.get("/auth/discord", (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=1514467728390623343&redirect_uri=https://willowwisk.apps.bot-hosting.cloud/callback&response_type=code&scope=identify%20guilds`;
  res.redirect(url);
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("🌐 Website running on port " + PORT);
});