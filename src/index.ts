import { Client } from "discord.js";

import config from "./utilities/config";
import deploy from "./utilities/deploy";
import commands from "./commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deploy({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commandName in commands && commands[commandName]) {
    commands[commandName].execute(interaction);
  }
});

client.login(config.token);