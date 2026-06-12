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
      height: 100vh;
      font-family: Arial, sans-serif;
      overflow: hidden;

      background: linear-gradient(135deg, #F7F2EA, #A8BFA3, #7C9D96);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5a4638;
      animation: pageIn 0.6s ease;
    }

    @keyframes pageIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .bg-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 60%);
      pointer-events: none;
      animation: glowShift 10s ease-in-out infinite alternate;
    }

    @keyframes glowShift {
      0% { transform: scale(1); }
      100% { transform: scale(1.05); }
    }

    .container {
      text-align: center;
      z-index: 2;
      width: 90%;
      max-width: 700px;
    }

    h1 {
      margin: 0;
      font-size: 42px;
    }

    p {
      opacity: 0.8;
      margin-top: 10px;
    }

    /* LAYOUT */
    .mascot-row {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 25px;
      flex-wrap: wrap;
    }

    .side {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    /* MIXING BOWL */
    .bowl {
      font-size: 70px;
      animation: float 4s ease-in-out infinite;
      filter: drop-shadow(0 10px 18px rgba(0,0,0,0.15));
      transition: transform 0.4s ease;
    }

    .bowl:hover {
      transform: scale(1.05);
    }

    @keyframes float {
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
      min-width: 140px;
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

    .full {
      width: 100%;
      text-align: center;
    }

  </style>
</head>

<body>

<div class="bg-glow"></div>

<div class="container">

  <h1 style="display:flex; align-items:center; justify-content:center; gap:10px;">
  <span style="font-size:38px;">🧁</span>
  Willow Wisk
  <span style="font-size:38px;">🧁</span>
</h1>
  <p>Manage tickets, moderation, logs, reaction roles & more</p>

  <div class="mascot-row">

    <!-- LEFT SIDE -->
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

    <!-- CENTER -->
    <div class="bowl">🥣</div>

    <!-- RIGHT SIDE -->
    <div class="side">

      <a class="card" href="/activity">
        <div class="title">Activity</div>
        <div class="desc">Recent logs</div>
      </a>

      <a class="card" href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands">
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
   STATUS PAGE (CUTE)
========================= */
app.get("/status", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Status</title>

  <style>
    body {
      margin: 0;
      height: 100vh;
      font-family: Arial;
      background: linear-gradient(135deg, #F7F2EA, #A8BFA3, #7C9D96);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5a4638;
    }

    .card {
      background: rgba(255,255,255,0.25);
      backdrop-filter: blur(14px);
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      width: 320px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      animation: fadeUp 0.6s ease;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dot {
      width: 10px;
      height: 10px;
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

    .bowl {
      font-size: 50px;
      margin-bottom: 10px;
    }

    a {
      display: inline-block;
      margin-top: 15px;
      text-decoration: none;
      color: #5a4638;
      font-weight: bold;
    }

  </style>
</head>

<body>

  <div class="card">

    <div class="bowl">🥣</div>

    <h2><span class="dot"></span> Online</h2>

    <p>Willow Wisk is running smoothly.</p>

    <p style="opacity:0.7; font-size:13px;">
      All systems operational
    </p>

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
    <p>Discord OAuth will be added next step.</p>
    <a href="/">Back</a>
  `);
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});