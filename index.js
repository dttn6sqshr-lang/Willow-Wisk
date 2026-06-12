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

/* =========================
   DISCORD CONFIG (HARDCODED)
========================= */
const CLIENT_ID = "1514467728390623343";
const CLIENT_SECRET = "YOUR_NEW_CLIENT_SECRET"; // replace this
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
body {
  margin:0;
  height:100vh;
  font-family: Arial;
  background: linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  color:#5a4638;
}

/* sparkles */
body::before {
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 40px 40px;
  opacity:0.12;
  animation: move 20s linear infinite;
}

@keyframes move {
  from {transform:translateY(0);}
  to {transform:translateY(-200px);}
}

.container {
  text-align:center;
  z-index:2;
}

.cupcake {
  font-size:64px;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%{transform:translateY(0);}
  50%{transform:translateY(-8px);}
  100%{transform:translateY(0);}
}

h1 {
  margin:0;
  font-size:42px;
}

.subtitle {
  opacity:0.8;
  margin-bottom:30px;
}

.layout {
  display:flex;
  gap:25px;
  justify-content:center;
  align-items:center;
}

.side {
  display:flex;
  flex-direction:column;
  gap:14px;
}

.bowl {
  font-size:70px;
  animation: floatBowl 4s ease-in-out infinite;
}

@keyframes floatBowl {
  0%{transform:translateY(0);}
  50%{transform:translateY(-6px);}
  100%{transform:translateY(0);}
}

.card {
  padding:16px;
  border-radius:18px;
  text-decoration:none;
  color:#5a4638;
  background:rgba(255,255,255,0.25);
  backdrop-filter:blur(12px);
  transition:0.3s;
}

.card:hover {
  transform:translateY(-5px);
}

.status {background:linear-gradient(135deg,#A8BFA3,#7C9D96);}
.login {background:linear-gradient(135deg,#F7F2EA,#DCE8D7);}
.activity {background:linear-gradient(135deg,#8B6F5A,#F7F2EA);}
.invite {background:linear-gradient(135deg,#7C9D96,#A8BFA3);}

</style>
</head>

<body>

<div class="container">

<div class="cupcake">🧁</div>
<h1>Willow Wisk</h1>
<p class="subtitle">Tickets • Moderation • Logs • Reaction Roles</p>

<div class="layout">

  <div class="side">
    <a class="card status" href="/status">Status</a>
    <a class="card login" href="/login">Login</a>
  </div>

  <div class="bowl">🥣</div>

  <div class="side">
    <a class="card activity" href="/activity">Activity</a>
    <a class="card invite"
      href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">
      Add to Discord
    </a>
  </div>

</div>

</div>

</body>
</html>
`);
});

/* =========================
   LOGIN PAGE
========================= */
app.get("/login", (req, res) => {
  res.send(`
  <div style="text-align:center;font-family:Arial;
  background:linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  height:100vh;display:flex;justify-content:center;align-items:center;">

    <div style="background:rgba(255,255,255,0.25);
    padding:30px;border-radius:20px;backdrop-filter:blur(12px)">

      <div style="font-size:60px">🥐</div>
      <h2>Login</h2>

      <a href="/auth/discord"
      style="padding:12px 18px;background:#7C9D96;
      color:white;text-decoration:none;border-radius:12px">
      Continue with Discord
      </a>

      <br><br>
      <a href="/">Back</a>

    </div>
  </div>
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
    headers: {
      Authorization: `Bearer ${token.data.access_token}`
    }
  });

  req.session.user = user.data;

  res.redirect("/");
});

/* =========================
   STATUS
========================= */
app.get("/status", (req, res) => {
  res.send("<h1>🟢 Online</h1><a href='/'>Back</a>");
});

/* =========================
   ACTIVITY
========================= */
app.get("/activity", (req, res) => {
  res.send("<h1>Activity</h1><p>No logs yet.</p><a href='/'>Back</a>");
});

/* =========================
   START
========================= */
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});