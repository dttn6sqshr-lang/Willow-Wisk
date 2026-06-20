const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 25414;

/* BOT */
require("./index.js");

/* SESSION */
app.use(session({
  secret: "willow-wisk-secret",
  resave: false,
  saveUninitialized: true
}));

/* LOGIN CHECK */
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
  res.sendFile(__dirname + "/home.html");
});

app.get("/home.html", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

/* ======================
   FEATURES
====================== */

app.get("/features.html", (req, res) => {
  res.sendFile(__dirname + "/features.html");
});

/* ======================
   CSS
====================== */

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

/* ======================
   LOGIN
====================== */

app.get("/auth/discord", (req, res) => {
  req.session.user = {
    id: "temp",
    username: "User"
  };

  res.redirect("/dashboard");
});

/* ======================
   DASHBOARD
====================== */

app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/dashboard.html", requireLogin, (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

/* ======================
   ERROR
====================== */

app.get("/error.html", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});

/* ======================
   STATS API
====================== */

app.get("/api/stats", (req, res) => {
  res.json(global.botStats);
});

/* ======================
   TEMP GUILDS API
====================== */

app.get("/api/guilds", (req, res) => {
  res.json([
    {
      name: "Willow Wisk Support",
      members: 245
    },
    {
      name: "Bakery Testing Server",
      members: 87
    },
    {
      name: "Cupcake Community",
      members: 501
    }
  ]);
});

/* ======================
   START
====================== */

app.listen(PORT, () => {
  console.log("Web running on " + PORT);
});