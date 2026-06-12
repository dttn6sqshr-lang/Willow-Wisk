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
  font-family: Arial;
  overflow:hidden;
  background: linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  color:#4b3b2f;
}

/* soft sparkles */
body::before{
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 45px 45px;
  opacity:0.12;
  animation: floatbg 25s linear infinite;
}

@keyframes floatbg{
  from{transform:translateY(0);}
  to{transform:translateY(-300px);}
}

/* HERO SECTION (RESTORED BIG CUTE STYLE) */
.hero{
  text-align:center;
  padding-top:40px;
}

.cupcake{
  font-size:90px;
  animation: bounce 3.5s ease-in-out infinite;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,0.15));
}

@keyframes bounce{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-10px);}
}

.title{
  font-size:54px;
  margin:0;
  font-weight:bold;
  letter-spacing:1px;
}

.subtitle{
  opacity:0.75;
  font-size:16px;
  margin-top:6px;
}

/* MAIN LAYOUT (AIRY AGAIN) */
.wrapper{
  height:65vh;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:70px;
}

/* columns */
.col{
  display:flex;
  flex-direction:column;
  gap:18px;
}

/* center bowl (decor only now) */
.bowl{
  font-size:95px;
  animation: float 4s ease-in-out infinite;
  opacity:0.9;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-10px);}
}

/* BIG CUTE CARDS */
.card{
  padding:22px 28px;
  border-radius:22px;
  background:rgba(255,255,255,0.28);
  backdrop-filter:blur(14px);
  text-decoration:none;
  color:#4b3b2f;
  font-size:18px;
  font-weight:500;
  transition:0.25s;
  min-width:140px;
  text-align:center;
}

.card:hover{
  transform:scale(1.08);
}

/* emphasize important ones */
.big{
  padding:30px 34px;
  font-size:20px;
}
</style>
</head>

<body>

<div class="hero">
  <div class="cupcake">🧁</div>
  <h1 class="title">Willow Wisk</h1>
  <div class="subtitle">A cozy bakery-style bot dashboard</div>
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