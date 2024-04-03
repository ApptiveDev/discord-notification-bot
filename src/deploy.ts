import { REST, Routes } from "discord.js";
import config from "./config";
import commands from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.token);

type DeployCommandsProps = {
  guildId: string;
};

export default async function deploy({ guildId }: DeployCommandsProps) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(config.clientId, guildId), {
      body: commandsData,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
