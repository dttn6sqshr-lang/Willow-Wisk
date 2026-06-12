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
const CLIENT_SECRET = "YOUR_NEW_CLIENT_SECRET";
const REDIRECT_URI = "https://willowwisk.apps.bot-hosting.cloud/callback";

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
  overflow:hidden;
  background: linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  color:#4b3b2f;
}

/* page transition */
body {
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {opacity:0; transform:translateY(10px);}
  to {opacity:1; transform:translateY(0);}
}

/* sparkles */
body::before {
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 40px 40px;
  opacity:0.12;
  animation: move 25s linear infinite;
}

@keyframes move {
  from {transform:translateY(0);}
  to {transform:translateY(-250px);}
}

/* layout FIXED */
.wrapper{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:40px;
}

/* columns */
.col{
  display:flex;
  flex-direction:column;
  gap:16px;
}

/* center bowl */
.center{
  font-size:80px;
  animation: float 4s ease-in-out infinite;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-8px);}
}

/* cards */
.card{
  padding:18px;
  border-radius:18px;
  background:rgba(255,255,255,0.25);
  backdrop-filter:blur(12px);
  text-decoration:none;
  color:#4b3b2f;
  transition:0.3s;
}

.card:hover{
  transform:scale(1.05);
}

/* BIGGER cards for status/activity */
.big{
  padding:26px;
  min-width:170px;
}

/* cupcake AI helper */
.ai{
  position:fixed;
  bottom:20px;
  right:20px;
  font-size:40px;
  cursor:pointer;
  animation:bounce 3s infinite;
}

@keyframes bounce{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-6px);}
}

</style>
</head>

<body>

<div class="wrapper">

  <!-- LEFT -->
  <div class="col">
    <a class="card big" href="/status">Status</a>
    <a class="card" href="/login">Login</a>
  </div>

  <!-- CENTER -->
  <div class="center">🥣</div>

  <!-- RIGHT -->
  <div class="col">
    <a class="card big" href="/activity">Activity</a>
    <a class="card" href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">
      Add to Discord
    </a>
  </div>

</div>

<!-- MASCOT AI -->
<div class="ai" onclick="alert('🧁 Hello! I am Willow Helper. Need help?')">
🧁
</div>

</body>
</html>
`);
});

/* =========================
   STATUS (BIGGER CARD)
========================= */
app.get("/status", (req, res) => {
  res.send(`
  <body style="display:flex;justify-content:center;align-items:center;height:100vh;
  font-family:Arial;background:linear-gradient(135deg,#2f5f5f,#7C9D96,#A8BFA3);color:white;
  animation:fade 0.6s ease;">

  <style>
  @keyframes fade{from{opacity:0}to{opacity:1}}
  .card{
    padding:60px;
    border-radius:25px;
    background:rgba(255,255,255,0.15);
    backdrop-filter:blur(14px);
    text-align:center;
    min-width:320px;
  }
  </style>

  <div class="card">
    <h1>🟢 Bot Status</h1>
    <p>All systems operational</p>
    <a href="/" style="color:white;">Back</a>
  </div>

  </body>
  `);
});

/* =========================
   ACTIVITY (BIGGER CARD)
========================= */
app.get("/activity", (req, res) => {
  res.send(`
  <body style="display:flex;justify-content:center;align-items:center;height:100vh;
  font-family:Arial;background:linear-gradient(135deg,#8B6F5A,#F7F2EA,#A8BFA3);
  animation:fade 0.6s ease;">

  <style>
  @keyframes fade{from{opacity:0}to{opacity:1}}
  .card{
    padding:60px;
    border-radius:25px;
    background:rgba(255,255,255,0.2);
    backdrop-filter:blur(14px);
    text-align:center;
    min-width:320px;
  }
  .log{
    margin-top:12px;
    padding:10px;
    background:rgba(255,255,255,0.25);
    border-radius:12px;
  }
  </style>

  <div class="card">
    <h1>Activity</h1>
    <div class="log">Bot started</div>
    <div class="log">System ready</div>
    <a href="/">Back</a>
  </div>

  </body>
  `);
});

/* =========================
   LOGIN
========================= */
app.get("/login", (req, res) => {
  res.send(`
  <body style="display:flex;justify-content:center;align-items:center;height:100vh;
  font-family:Arial;background:linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);">

  <div style="padding:40px;border-radius:20px;background:rgba(255,255,255,0.25);
  backdrop-filter:blur(12px);text-align:center">

    <div style="font-size:60px">🥐</div>
    <h2>Login</h2>

    <a href="/auth/discord" style="padding:12px 18px;
    background:#7C9D96;color:white;text-decoration:none;border-radius:12px;">
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
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
  res.redirect(url);
});

/* =========================
   CALLBACK
========================= */
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const token = await axios.post("https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
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

/* =========================
   START
========================= */
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});