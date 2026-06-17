const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 25414;

/* -----------------------------
   Middleware
------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -----------------------------
   HOME PAGE (FORCED HTML)
------------------------------*/
app.get("/", (req, res) => {
  console.log("HOME HIT");
  res.sendFile(path.join(__dirname, "home.html"));
});

/* -----------------------------
   TEST ROUTE (DEBUG)
------------------------------*/
app.get("/test", (req, res) => {
  res.send("OK Willow Wisk 🧁");
});

/* -----------------------------
   STATUS
------------------------------*/
app.get("/status", (req, res) => {
  res.send("Status page coming soon 🥣");
});

/* -----------------------------
   ACTIVITY
------------------------------*/
app.get("/activity", (req, res) => {
  res.send("Activity page coming soon 🎀");
});

/* -----------------------------
   START SERVER
------------------------------*/
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});