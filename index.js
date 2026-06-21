const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

/* ======================
   GLOBAL DATA
====================== */

global.botStats = {
  servers: 0,
  users: 0,
  uptime: Date.now()
};

/* ======================
   READY
====================== */

client.once("ready", async () => {
  console.log("Bot online");

  await client.guilds.fetch();

  updateStats();
});

/* ======================
   STATS UPDATE
====================== */

function updateStats() {
  global.botStats.servers = client.guilds.cache.size;

  global.botStats.users = client.guilds.cache.reduce((acc, g) => {
    return acc + (g.memberCount || 0);
  }, 0);

  global.botStats.uptime = Date.now();
}

setInterval(updateStats, 60000);

/* ======================
   EXPORT CLIENT
====================== */

module.exports = { client };

client.login(process.env.TOKEN);