const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

/* ======================
   GLOBAL STATS
====================== */

global.botStats = {
  servers: 0,
  users: 0,
  uptime: Date.now()
};

/* ======================
   READY EVENT
====================== */

client.once("ready", () => {
  console.log(`Bot online`);

  updateStats();
});

/* ======================
   UPDATE FUNCTION
====================== */

function updateStats() {
  if (!client.isReady()) return;

  botStats.servers = client.guilds.cache.size;

  botStats.users = client.guilds.cache.reduce((acc, guild) => {
    return acc + (guild.memberCount || 0);
  }, 0);

  botStats.uptime = Date.now();
}

/* live refresh */
setInterval(updateStats, 60000);

/* ======================
   LOGIN
====================== */

client.login(process.env.TOKEN);