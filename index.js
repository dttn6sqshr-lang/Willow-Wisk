const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

/* -----------------------------
   Basic setup
------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -----------------------------
   Serve static files
------------------------------*/
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* -----------------------------
   STATUS PAGE (placeholder)
------------------------------*/
app.get("/status", (req, res) => {
  res.send("Status page coming soon 🧁");
});

/* -----------------------------
   ACTIVITY PAGE (placeholder)
------------------------------*/
app.get("/activity", (req, res) => {
  res.send("Activity page coming soon 🥣");
});

/* -----------------------------
   AUTH PLACEHOLDERS (safe)
------------------------------*/
app.get("/auth/discord", (req, res) => {
  res.send("OAuth step coming next");
});

app.get("/callback", (req, res) => {
  res.send("Callback step coming next");
});

/* -----------------------------
   START SERVER
------------------------------*/
app.listen(PORT, () => {
  console.log("Willow Wisk running on port " + PORT);
});