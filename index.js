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
   DISCORD CONFIG
========================= */
const CLIENT_ID = "1514467728390623343";
const CLIENT_SECRET = "YOUR_NEW_CLIENT_SECRET";
const REDIRECT_URI = "https://willowwisk.apps.bot-hosting.cloud/callback";

/* =========================
   HOME PAGE (BAKERY WORLD)
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
  overflow:hidden;
  color:#4b3b2f;
}

/* dreamy bakery background */
body {
  background: radial-gradient(circle at top,
  #F7F2EA, #A8BFA3, #7C9D96);
}

/* floating sparkles */
body::before {
  content:"";
  position:fixed;
  inset:0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 45px 45px;
  opacity:0.12;
  animation: drift 25s linear infinite;
}

@keyframes drift {
  from {transform:translateY(0);}
  to {transform:translateY(-300px);}
}

.center {
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
}

.cupcake {
  font-size:70px;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%,100% {transform:translateY(0);}
  50% {transform:translateY(-10px);}
}

h1 {
  margin:0;
  font-size:44px;
}

.bowl {
  font-size:72px;
  margin-top:25px;
  animation: float2 4s ease-in-out infinite;
}

@keyframes float2 {
  0%,100% {transform:translateY(0);}
  50% {transform:translateY(-8px);}
}

.menu {
  margin-top:25px;
  display:flex;
  gap:30px;
}

.menu a {
  text-decoration:none;
  font-weight:bold;
  color:#4b3b2f;
  font-size:15px;
  opacity:0.8;
  transition:0.3s;
}

.menu a:hover {
  opacity:1;
  transform:scale(1.1);
}
</style>
</head>

<body>

<div class="center">

  <div class="cupcake">🧁</div>
  <h1>Willow Wisk</h1>
  <p>Welcome to the bakery system</p>

  <div class="bowl">🥣</div>

  <div class="menu">
    <a href="/status">Status</a>
    <a href="/activity">Activity</a>
    <a href="/login">Login</a>
    <a href="https://discord.com/oauth2/authorize?client_id=1514467728390623343&permissions=8&scope=bot%20applications.commands">Add to Discord</a>
  </div>

</div>

</body>
</html>
`);
});

/* =========================
   STATUS PAGE (COOL BLUE GREEN ROOM)
========================= */
app.get("/status", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Status</title>

<style>
body {
  margin:0;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family:Arial;
  color:white;
  background: linear-gradient(135deg,#2f5f5f,#7C9D96,#A8BFA3);
}

.card {
  background: rgba(255,255,255,0.15);
  padding:40px;
  border-radius:25px;
  text-align:center;
  backdrop-filter: blur(14px);
}

.dot {
  width:10px;
  height:10px;
  background:#4ade80;
  border-radius:50%;
  display:inline-block;
  animation:pulse 2s infinite;
}

@keyframes pulse {
  0%{transform:scale(1);}
  50%{transform:scale(1.5);}
  100%{transform:scale(1);}
}

</style>
</head>

<body>

<div class="card">
  <h1>🟢 Bot Status</h1>
  <p><span class="dot"></span> All systems operational</p>
  <a href="/" style="color:white;">Back Home</a>
</div>

</body>
</html>
`);
});

/* =========================
   ACTIVITY PAGE (WARM BAKERY ROOM)
========================= */
app.get("/activity", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Activity</title>

<style>
body {
  margin:0;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family:Arial;
  background: linear-gradient(135deg,#8B6F5A,#F7F2EA,#A8BFA3);
  color:#4b3b2f;
}

.card {
  background: rgba(255,255,255,0.2);
  padding:35px;
  border-radius:20px;
  backdrop-filter: blur(12px);
  text-align:center;
}

.log {
  margin-top:15px;
  padding:10px;
  background: rgba(255,255,255,0.25);
  border-radius:12px;
}
</style>
</head>

<body>

<div class="card">
  <h1>Activity</h1>

  <div class="log">Bot started successfully</div>
  <div class="log">Ticket system ready</div>
  <div class="log">No moderation actions yet</div>

  <br>
  <a href="/">Back Home</a>
</div>

</body>
</html>
`);
});

/* =========================
   LOGIN PAGE (COZY ROOM)
========================= */
app.get("/login", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Login</title>

<style>
body {
  margin:0;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family:Arial;
  background: linear-gradient(135deg,#F7F2EA,#DCE8D7,#A8BFA3);
  color:#4b3b2f;
}

.card {
  text-align:center;
  padding:40px;
  border-radius:25px;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(14px);
}

button {
  padding:12px 20px;
  border:none;
  border-radius:12px;
  background:#7C9D96;
  color:white;
  cursor:pointer;
}
</style>
</head>

<body>

<div class="card">

  <div style="font-size:60px;">🥐</div>

  <h1>Login</h1>
  <p>Continue with Discord</p>

  <a href="/auth/discord">
    <button>Login</button>
  </a>

</div>

</body>
</html>
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
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});