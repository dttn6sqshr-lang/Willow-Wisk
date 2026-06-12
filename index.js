const express = require("express");
const app = express();

const PORT = process.env.PORT || 25414;

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
      margin: 0;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      overflow-x: hidden;
      background: linear-gradient(135deg, #F7F2EA, #A8BFA3, #7C9D96);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5a4638;
      animation: pageIn 0.7s ease;
    }

    @keyframes pageIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .bg-glow {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center,
        rgba(255,255,255,0.18), transparent 60%);
      animation: glowShift 10s ease-in-out infinite alternate;
      pointer-events: none;
    }

    @keyframes glowShift {
      0% { transform: scale(1); }
      100% { transform: scale(1.06); }
    }

    .container {
      text-align: center;
      z-index: 2;
      width: 92%;
      max-width: 760px;
      padding: 20px;
    }

    /* CUPCAKE LOGO */
    .hero-logo {
      font-size: 64px;
      margin-bottom: 8px;
      animation: cupcakeFloat 3.8s ease-in-out infinite,
                 cupcakeGlow 4s ease-in-out infinite;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.12));
    }

    @keyframes cupcakeFloat {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }

    @keyframes cupcakeGlow {
      0% {
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.25));
      }
      50% {
        filter: drop-shadow(0 0 18px rgba(255,255,255,0.5));
      }
      100% {
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.25));
      }
    }

    .main-title {
      margin: 0;
      font-size: 42px;
      letter-spacing: 0.5px;
    }

    .subtitle {
      opacity: 0.8;
      margin-top: 10px;
      margin-bottom: 35px;
    }

    /* ACTION LAYOUT */
    .mascot-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 28px;
      flex-wrap: wrap;
    }

    .side {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* MIXING BOWL CENTER */
    .bowl {
      font-size: 74px;
      animation: bowlFloat 4s ease-in-out infinite;
      filter: drop-shadow(0 10px 18px rgba(0,0,0,0.15));
      transition: transform 0.4s ease;
    }

    .bowl:hover {
      transform: scale(1.05);
    }

    @keyframes bowlFloat {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }

    /* CARDS */
    .card {
      background: rgba(255,255,255,0.25);
      backdrop-filter: blur(14px);
      border-radius: 20px;
      padding: 18px;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow: 0 8px 25px rgba(0,0,0,0.08);
      text-decoration: none;
      color: #5a4638;
      min-width: 150px;
    }

    .card:hover {
      transform: translateY(-6px) scale(1.02);
      background: rgba(255,255,255,0.35);
    }

    .card:active {
      transform: scale(0.98);
    }

    .title {
      font-weight: bold;
      font-size: 18px;
    }

    .desc {
      font-size: 13px;
      opacity: 0.8;
      margin-top: 5px;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: #4ade80;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      box-shadow: 0 0 10px rgba(74,222,128,0.6);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.4); }
      100% { transform: scale(1); }
    }
  </style>
</head>

<body>

<div class="bg-glow"></div>

<div class="container">

  <div class="hero-logo">🧁</div>

  <h1 class="main-title">Willow Wisk</h1>

  <p class="subtitle">
    Manage tickets, moderation, logs, reaction roles & more
  </p>

  <div class="mascot-row">

    <div class="side">
      <a class="card" href="/status">
        <div class="title"><span class="dot"></span>Status</div>
        <div class="desc">Bot health</div>
      </a>

      <a class="card" href="/login">
        <div class="title">Login</div>
        <div class="desc">Dashboard access</div>
      </a>
    </div>

    <div class="bowl">🥣</div>

    <div class="side">
      <a class="card" href="/activity">
        <div class="title">Activity</div>
        <div class="desc">Recent logs</div>
      </a>

      <a class="card"
        href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands">
        <div class="title">Add to Discord</div>
        <div class="desc">Invite bot</div>
      </a>
    </div>

  </div>

</div>

</body>
</html>
  `);
});

/* =========================
   STATUS PAGE
========================= */
app.get("/status", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Status</title>
<style>
body{
  margin:0;
  height:100vh;
  font-family:Arial;
  background: linear-gradient(135deg,#F7F2EA,#A8BFA3,#7C9D96);
  display:flex;
  justify-content:center;
  align-items:center;
  color:#5a4638;
}
.card{
  background:rgba(255,255,255,0.25);
  backdrop-filter:blur(14px);
  padding:35px;
  border-radius:20px;
  text-align:center;
  width:330px;
}
.dot{
  width:10px;
  height:10px;
  background:#4ade80;
  border-radius:50%;
  display:inline-block;
  margin-right:6px;
}
.bowl{
  font-size:52px;
}
a{
  text-decoration:none;
  color:#5a4638;
  font-weight:bold;
}
</style>
</head>
<body>

<div class="card">
<div class="bowl">🥣</div>
<h2><span class="dot"></span> Online</h2>
<p>Willow Wisk is running smoothly.</p>
<p>All systems operational.</p>
<a href="/">← Back Home</a>
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
    <h1>Activity</h1>
    <p>No recent logs yet.</p>
    <a href="/">Back</a>
  `);
});

/* =========================
   LOGIN PAGE
========================= */
app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <p>Discord OAuth coming next.</p>
    <a href="/">Back</a>
  `);
});

/* =========================
   SERVER START
========================= */
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});