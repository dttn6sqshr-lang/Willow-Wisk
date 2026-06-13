const express = require("express");
const session = require("express-session");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 25414;

/* =========================
   SESSION
========================= */
app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: false
}));

const CLIENT_ID = "1514467728390623343";
const CLIENT_SECRET = "wkn52DREW39kMHACbCRFPmnH1FZzh6Db";
const REDIRECT_URI = "https://willowwisk.apps.bot-hosting.cloud/callback";

/* =========================
   HOME PAGE (RESTORED BRANDING)
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

/* sparkles */
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

/* BIGGER CARD */
.card{
  width:520px;
  padding:50px;
  border-radius:32px;
  background:rgba(255,255,255,0.28);
  backdrop-filter:blur(18px);
  text-align:center;
  box-shadow:0 18px 50px rgba(0,0,0,0.12);
  animation: fadeUp 0.6s ease;
}

@keyframes fadeUp{
  from{opacity:0; transform:translateY(15px);}
  to{opacity:1; transform:translateY(0);}
}

/* cupcake */
.cupcake{
  font-size:95px;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-10px);}
}

/* title */
.title{
  font-size:48px;
  margin:10px 0 5px 0;
  font-weight:bold;
}

/* subtitle */
.subtitle{
  font-size:15px;
  opacity:0.75;
  margin-bottom:22px;
}

/* bowl */
.bowl{
  font-size:65px;
  margin:10px 0 25px 0;
  opacity:0.9;
}

/* GRID */
.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
}

/* UNIFIED BUTTON STYLE (ONE COLOR ONLY) */
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

/* STATUS */
app.get("/status", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Willow Wisk Status</title>

<style>
body{
  margin:0;
  height:100vh;
  font-family:Arial;
  display:flex;
  justify-content:center;
  align-items:center;
  background: linear-gradient(135deg,#2f5f5f,#7C9D96,#A8BFA3);
  color:white;
  overflow:hidden;
}

body::before{
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity:0.15;
  animation: floatbg 25s linear infinite;
}

@keyframes floatbg{
  from{transform:translateY(0);}
  to{transform:translateY(-300px);}
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

.oven{
  text-align:center;
  font-size:70px;
  margin:10px 0 20px 0;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-10px);}
}

.recipe, .report{
  margin-top:12px;
  padding:12px;
  border-radius:14px;
  background:rgba(255,255,255,0.1);
  font-size:13px;
}
</style>
</head>

<body>

<div class="panel">

  <div class="header">
    <div class="title">🧁 Willow Wisk Status</div>
    <div class="light"></div>
  </div>

  <div class="oven">🍰</div>

  <div class="grid">
    <div class="card">⌛︎ Uptime: <span id="uptime">0s</span></div>
    <div class="card">ᯤ Ping: 24ms</div>
    <div class="card">಄ Status: Online</div>
    <div class="card">ⓘ Commands Today: 128</div>
    <div class="card">✉︎ Tickets Today: 14</div>
    <div class="card">✎𓂃 Logs: Active</div>
  </div>

  <div class="recipe">
    🍪 System Recipe:
    Express + Discord API + OAuth + Sessions
  </div>

  <div class="report">
    📅 Daily Bakery Report:
    System running smoothly. No issues detected.
  </div>

</div>

<script>
let s = 0;
setInterval(() => {
  s++;
  document.getElementById("uptime").innerText = s + "s";
}, 1000);
</script>

</body>
</html>
`);
});

/* ACTIVITY */
app.get("/activity", (req, res) => {
  res.send(`
  <body style="margin:0;height:100vh;display:flex;justify-content:center;align-items:center;
  font-family:Arial;background:linear-gradient(135deg,#8B6F5A,#F7F2EA,#A8BFA3);">

  <div style="text-align:center;padding:60px;border-radius:25px;
  background:rgba(255,255,255,0.2);backdrop-filter:blur(14px);">
    <h1>Activity</h1>
    <p>No logs yet</p>
    <a href="/">Back</a>
  </div>

  </body>
  `);
});

/* LOGIN */
app.get("/login", (req, res) => {
  res.send(`
  <body style="margin:0;height:100vh;display:flex;justify-content:center;align-items:center;
  font-family:Arial;background:linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);">

  <div style="text-align:center;padding:40px;border-radius:20px;
  background:rgba(255,255,255,0.25);backdrop-filter:blur(12px);">

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

/* DISCORD AUTH */
app.get("/auth/discord", (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
  res.redirect(url);
});

/* CALLBACK */
app.get("/callback", async (req, res) => {
  const token = await axios.post("https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: REDIRECT_URI
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const user = await axios.get("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.data.access_token}` }
  });

  req.session.user = user.data;
  res.redirect("/");
});

/* START */
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});