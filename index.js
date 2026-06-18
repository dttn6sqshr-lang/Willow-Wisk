const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

let activityLog = [];

function addActivity(text){
  activityLog.unshift({ text, time: Date.now() });
  if(activityLog.length > 20) activityLog.pop();
}

client.once("ready", () => {
  console.log("Bot online");
  addActivity("Bot started");
});

client.on("guildCreate", g => {
  addActivity("Joined: " + g.name);
});

client.on("guildDelete", g => {
  addActivity("Left: " + g.name);
});

/* expose for app.js later if needed */
module.exports = { client, activityLog, addActivity };

client.login(process.env.TOKEN);