const express = require("express");
const app = express();

// PORT (your hosting requires 25414)
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
      max-width: 600px;
    }

    .mascot {
      font-size: 70px;
      animation: float 4s ease-in-out infinite;
      margin-bottom: 10px;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }

    h1 {
      margin: 0;
      font-size: 42px;
    }

    p {
      opacity: 0.8;
      margin-top: 10px;
    }

    .grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

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
    }

    .card:hover {
      transform: translateY(-6px) scale(1.02);
      background: rgba(255,255,255,0.35);
    }

    .card:active {
      transform: scale(0.98);
    }

    .full {
      grid-column: span 2;
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

    /* status dot */
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

  <div class="mascot">🧁</div>

  <h1>Willow Wisk</h1>
  <p>Manage tickets, moderation, logs, reaction roles & more</p>

  <div class="grid">

    <a class="card" href="/status">
      <div class="title"><span class="dot"></span>Status</div>
      <div class="desc">Check bot health</div>
    </a>

    <a class="card" href="/activity">
      <div class="title">Activity</div>
      <div class="desc">View recent logs</div>
    </a>

    <a class="card" href="/login">
      <div class="title">Login</div>
      <div class="desc">Access dashboard</div>
    </a>

    <a class="card full"
      href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands">
      <div class="title">Add to Discord</div>
      <div class="desc">Invite Willow Wisk to your server</div>
    </a>

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
    <h1>Bot Status</h1>
    <p>Willow Wisk is online and running.</p>
    <a href="/">Back</a>
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
   LOGIN PAGE (placeholder)
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