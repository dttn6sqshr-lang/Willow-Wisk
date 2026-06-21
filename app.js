const express = require("express");
const session = require("express-session");
const axios = require("axios");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 25414;
const io = new Server(server);

require("./index.js");
const { client } = require("./index.js");
app.use(express.static(__dirname));
/* ======================
   DISCORD OAUTH CONFIG
====================== */

const CLIENT_ID = "1514467728390623343";
const CLIENT_SECRET = "wkn52DREW39kMHACbCRFPmnH1FZzh6Db";
const REDIRECT_URI = "https://willowwisk.apps.bot-hosting.cloud/callback";

/* ======================
   SESSION
====================== */

app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* ======================
   LOGIN CHECK
====================== */

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/error.html");
  }
  next();
}

/* ======================
   HOME
====================== */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* ======================
   DASHBOARD (PROTECTED)
====================== */

app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.get("/dashboard.html", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

/* ======================
   ERROR PAGE
====================== */

app.get("/error.html", (req, res) => {
  res.sendFile(path.join(__dirname, "error.html"));
});

/* ======================
   DISCORD LOGIN
====================== */

app.get("/auth/discord", (req, res) => {
  const url =
    `https://discord.com/api/oauth2/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=identify%20guilds`;

  res.redirect(url);
});

/* ======================
   OAUTH CALLBACK
====================== */

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) return res.redirect("/error.html");

  try {
    const tokenRes = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    req.session.user = userRes.data;
req.session.accessToken = accessToken;

res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.redirect("/error.html");
  }
});

/* ======================
   STATS API
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats);
});

/* ======================
   GUILDS API (REAL BOT SERVERS)
====================== */
app.get("/api/guilds", async (req, res) => {
  try {
    const guildRes = await axios.get(
      "https://discord.com/api/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`
        }
      }
    );

    const guilds = guildRes.data;

    const filtered = guilds.filter(g => {
      const perms = BigInt(g.permissions);
      const ADMIN = 0x8n;
      const MANAGE_GUILD = 0x20n;

      return (
        (perms & ADMIN) === ADMIN ||
        (perms & MANAGE_GUILD) === MANAGE_GUILD
      );
    });

    res.json(filtered);

  } catch (err) {
    console.log(err);
    res.json([]);
  }
});

res.json(filtered);

  } catch (err) {
    console.log(err);
    res.json([]);
  }

});

app.get("/api/session", (req, res) => {
  res.json({
    loggedIn: !!req.session.user,
    user: req.session.user || null
  });
});

app.get("/bakerylog.html", (req, res) => {
  res.sendFile(path.join(__dirname, "bakerylog.html"));
});

app.get("/status.html", (req, res) => {
  res.sendFile(path.join(__dirname, "status.html"));
});

let bakeryLog = [
  {
    title: "🧁 Batch #005",
    text: "Live bakery system started.",
    time: Date.now()
  }
];

app.get("/api/bakerylog", (req, res) => {
  res.json(bakeryLog);
});

function addLog(title, text) {

  const newLog = {
    title,
    text,
    time: Date.now()
  };

  bakeryLog.unshift(newLog);

  io.emit("newLog", newLog);

}

function autoLog(eventName, message) {
  addLog("🧁 System Update: " + eventName, message);
}

app.get("/server.html", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "server.html"));
});

app.get("/api/checkbot/:guildId", (req, res) => {

  const guildId = req.params.guildId;

  const guild = client.guilds.cache.get(guildId);

  res.json({
    inServer: !!guild
  });

});
/* ======================
   START SERVER
====================== */

server.listen(PORT, () => {
  console.log("Web running on " + PORT);

  autoLog(
    "Server Started",
    "Willow Wisk backend is now running"
  );
});