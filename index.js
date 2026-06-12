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

/* MAIN CARD */
.card{
  width:420px;
  padding:35px;
  border-radius:28px;
  background:rgba(255,255,255,0.25);
  backdrop-filter:blur(18px);
  text-align:center;
  box-shadow:0 15px 40px rgba(0,0,0,0.1);
  animation: fadeUp 0.6s ease;
}

@keyframes fadeUp{
  from{opacity:0; transform:translateY(15px);}
  to{opacity:1; transform:translateY(0);}
}

/* cupcake */
.cupcake{
  font-size:80px;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-8px);}
}

/* title */
.title{
  font-size:40px;
  margin:10px 0 5px 0;
  font-weight:bold;
}

/* subtitle */
.subtitle{
  font-size:14px;
  opacity:0.75;
  margin-bottom:20px;
}

/* bowl accent */
.bowl{
  font-size:55px;
  margin:10px 0 20px 0;
  opacity:0.9;
}

/* buttons grid */
.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}

/* buttons */
.btn{
  padding:14px;
  border-radius:16px;
  text-decoration:none;
  color:#4b3b2f;
  background:rgba(255,255,255,0.35);
  backdrop-filter:blur(10px);
  transition:0.25s;
  font-weight:500;
}

.btn:hover{
  transform:scale(1.05);
}

/* accent buttons */
.status{background:linear-gradient(135deg,#A8BFA3,#7C9D96);}
.activity{background:linear-gradient(135deg,#8B6F5A,#F7F2EA);}
.login{background:linear-gradient(135deg,#F7F2EA,#DCE8D7);}
.discord{background:linear-gradient(135deg,#7C9D96,#A8BFA3);}
</style>
</head>

<body>

<div class="card">

  <div class="cupcake">🧁</div>
  <div class="title">Willow Wisk</div>
  <div class="subtitle">A cozy bakery-style bot dashboard</div>

  <div class="bowl">🥣</div>

  <div class="grid">
    <a class="btn status" href="/status">Status</a>
    <a class="btn activity" href="/activity">Activity</a>
    <a class="btn login" href="/login">Login</a>
    <a class="btn discord" href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">
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