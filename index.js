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
  overflow:hidden;
  background: linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  color:#4b3b2f;
}

/* sparkles */
body::before{
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 40px 40px;
  opacity:0.12;
  animation: move 25s linear infinite;
}

@keyframes move{
  from{transform:translateY(0);}
  to{transform:translateY(-250px);}
}

/* HEADER AREA (RESTORED) */
.header{
  text-align:center;
  padding-top:25px;
}

.cupcake{
  font-size:60px;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-8px);}
}

.title{
  font-size:42px;
  margin:0;
}

/* MAIN LAYOUT */
.wrapper{
  height:80vh;
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
.bowl{
  font-size:80px;
  animation: float2 4s ease-in-out infinite;
}

@keyframes float2{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-8px);}
}

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

.big{
  padding:26px;
  min-width:170px;
}
</style>
</head>

<body>

<!-- 🧁 RESTORED HEADER -->
<div class="header">
  <div class="cupcake">🧁</div>
  <h1 class="title">Willow Wisk</h1>
</div>

<div class="wrapper">

  <div class="col">
    <a class="card big" href="/status">Status</a>
    <a class="card" href="/login">Login</a>
  </div>

  <div class="bowl">🥣</div>

  <div class="col">
    <a class="card big" href="/activity">Activity</a>
    <a class="card" href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">
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
  <body style="margin:0;height:100vh;display:flex;justify-content:center;align-items:center;
  font-family:Arial;background:linear-gradient(135deg,#2f5f5f,#7C9D96,#A8BFA3);color:white;">

  <div style="text-align:center;padding:60px;border-radius:25px;
  background:rgba(255,255,255,0.15);backdrop-filter:blur(14px);">
    <h1>🟢 Bot Status</h1>
    <p>All systems operational</p>
    <a href="/" style="color:white;">Back</a>
  </div>

  </body>
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