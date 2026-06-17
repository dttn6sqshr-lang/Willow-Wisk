const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

/* -----------------------------
   Middleware
------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -----------------------------
   STATIC FILES (IMPORTANT FIX)
------------------------------*/
app.use(express.static(__dirname));

/* -----------------------------
   HOME PAGE (FORCED HTML)
------------------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/* -----------------------------
   TEST ROUTE (DEBUG)
------------------------------*/
app.get("/test", (req, res) => {
  res.send("OK Willow Wisk is running 🧁");
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
  console.log("Willow Wisk running on port " + PORT);
});