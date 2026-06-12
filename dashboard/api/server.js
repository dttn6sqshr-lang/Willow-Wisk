const express = require("express");
const app = express();

app.use(express.json());

let botStatus = {
  online: false,
  guilds: 0,
  users: 0
};

// Health check (website will use this)
app.get("/status", (req, res) => {
  res.json(botStatus);
});

// Update status from bot
app.post("/update", (req, res) => {
  botStatus = req.body;
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("API running on port 25414");
});