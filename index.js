const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const axios = require("axios");

const CLIENT_ID = "1514467728390623343";

// comes from host environment
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URI = "https://willowwisk.apps.bot-hosting.cloud/callback";
  
const app = express();
const PORT = process.env.PORT || 25414;

const activityLog = [];
function addLog(type, message) {
  activityLog.unshift({
    type,
    message,
    time: new Date().toLocaleTimeString()
  });

  // keep only last 30 logs
  if (activityLog.length > 30) activityLog.pop();
}

/* =========================
   DISCORD BOT SETUP
========================= */
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  addLog("system", "🧁 Bot is now online");
});

client.on("guildMemberAdd", (member) => {
  addLog("join", `👥 ${member.user.username} joined`);
});

client.on("guildMemberRemove", (member) => {
  addLog("leave", `👋 ${member.user.username} left`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  addLog("message", `💬 Message in #${msg.channel.name}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith("!")) {
    addLog("command", `🧁 Command used: ${msg.content}`);
  }
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
.auth-loading::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(6px);
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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
    <button class="btn" onclick="loginDiscord()">Login</button>
    <a class="btn" href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">
      Add to Discord
    </a>
  </div>

</div>

<script>
let loginPopup;

function loginDiscord() {
  loginPopup = window.open(
    "/auth/discord",
    "discordLogin",
    "width=520,height=720"
  );

  // start checking login status
  const check = setInterval(async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();

      if (data.loggedIn) {
        clearInterval(check);

        if (loginPopup) loginPopup.close();

        showLoggedInUI(data.user);
      }
    } catch (err) {
      console.log("checking login...");
    }
  }, 1000);
}
</script>

<script>
function showLoggedInUI(user) {
  const container = document.querySelector(".grid");

  container.innerHTML =
  '<div class="welcome-card">' +
    '👤 ' + (user.username || "Baker") +
    '<h2>Welcome back, baker</h2>' +
    '<p>Choose a server to continue</p>' +
  '</div>' +
  '<div id="servers"></div>';
loadServers();
}
</script>

<script>
async function loadServers() {
  const res = await fetch("/api/guilds");
  const guilds = await res.json();

  const container = document.getElementById("servers");

  container.innerHTML = guilds.map(function(g){
  return '<div class="server-card">' +
         '<div class="icon">🧁</div>' +
         '<div class="name">' + g.name + '</div>' +
         '<button onclick="openServer(\\'' + g.id + '\\')">Manage</button>' +
         '</div>';
}).join("");
}
</script>

<script>
function openServer(id) {
  history.pushState({}, "", `/dashboard/${id}`);

  document.body.innerHTML =
  '<div class="loading">' +
  '🥣 Opening bakery...' +
  '</div>';

  // later you load dashboard via fetch()
}
</script>

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
<!DOCTYPE html>
<html>
<head>
<title>Willow Wisk Activity</title>

<style>
body{
  margin:0;
  font-family:Arial;
  background: linear-gradient(135deg,#3a2f2a,#7C9D96,#A8BFA3);
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
}

.panel{
  width:760px;
  padding:25px;
  border-radius:24px;
  background:rgba(255,255,255,0.12);
  backdrop-filter:blur(16px);
}

h2{
  margin-top:0;
}

.filters{
  display:flex;
  gap:8px;
  margin-bottom:18px;
  flex-wrap:wrap;
}

.filter{
  padding:10px 14px;
  border:none;
  border-radius:14px;
  cursor:pointer;
  background:#7C9D96;
  color:white;
}

.filter.active{
  transform:scale(1.05);
}

.logs{
  max-height:420px;
  overflow:auto;
}

.log{
  padding:12px;
  margin-bottom:10px;
  border-radius:14px;
  background:rgba(255,255,255,0.12);
  font-size:13px;
}
</style>
</head>

<body>

<div class="panel">

<h2>🧁 Willow Activity Feed</h2>

<div class="filters">
  <button class="filter" onclick="loadLogs('all')">📋 All</button>
  <button class="filter" onclick="loadLogs('command')">🧁 Commands</button>
  <button class="filter" onclick="loadLogs('join')">👥 Members</button>
  <button class="filter" onclick="loadLogs('message')">💬 Messages</button>
  <button class="filter" onclick="loadLogs('system')">⚙️ System</button>
</div>

<div class="logs" id="logs"></div>

</div>

<script>

let current = "all";

async function loadLogs(type = current){
  current = type;

  const res = await fetch("/api/activity?type=" + type);
  const data = await res.json();

  const logs = document.getElementById("logs");
  logs.innerHTML = "";

  if(data.length === 0){
    logs.innerHTML = "<div class='log'>No activity yet 🧁</div>";
    return;
  }

  data.forEach(log => {
    const div = document.createElement("div");
    div.className = "log";
    div.innerText = "[" + log.time + "] " + log.message;
    logs.appendChild(div);
  });
}

setInterval(() => loadLogs(), 2000);

loadLogs();

</script>

</body>
</html>
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
  const discordURL =
    "https://discord.com/api/oauth2/authorize" +
    "?client_id=" + CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&response_type=code" +
    "&scope=identify guilds";
    
    res.send(`
<html>
<head>
<style>
body {
  margin:0;
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  background: linear-gradient(135deg,#F8F3E8,#A8BFA3,#7C9D96);
  font-family:sans-serif;
  color:#5B4636;
}

.box {
  text-align:center;
}

.bowl {
  font-size:50px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
</head>

<body>
  <div class="box">
    <div class="bowl">🥣</div>
    <h2>Opening bakery portal...</h2>
    <p>Redirecting to Discord</p>
  </div>

  <script>
    setTimeout(() => {
      window.location.href = "${discordURL}";
    }, 1200);
  </script>
</body>
</html>
`);

  res.redirect(discordURL);
});

/* CALLBACK */
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send("No code received");
  }

  res.send(`
  <html>

  <style>
  body{
    margin:0;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:linear-gradient(135deg,#F8F3E8,#A8BFA3,#7C9D96);
    font-family:Arial;
    color:#5B4636;
  }

  .box{
    padding:40px;
    border-radius:24px;
    background:rgba(255,255,255,0.7);
    text-align:center;
  }

  .bowl{
    font-size:50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin{
    from{transform:rotate(0deg);}
    to{transform:rotate(360deg);}
  }
  </style>

  <body>

  <div class="box">
    <div class="bowl">🥣</div>
    <h2>Authentication complete</h2>
    <p>Preparing your bakery...</p>
  </div>

  <script>
  setTimeout(()=>{
    window.close();
  },2000)
  </script>
  
  req.session.user = {
  id: discordUser.id,
  username: discordUser.username,
  avatar: discordUser.avatar
};

  </body>
  </html>
  `);
});

/* USER SESSION */
app.get("/api/user", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    user: req.session.user
  });
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("🌐 Website running on port " + PORT);
});