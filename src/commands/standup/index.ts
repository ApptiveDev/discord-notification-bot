import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import texts from "./texts.json";

import * as add from "./add";
import * as manager from "./manager";
import * as remove from "./remove";

export const data = new SlashCommandBuilder()
  .setName(texts["en-US"].NAME)
  .setNameLocalization("ko", texts["ko"].NAME)
  .setDescription(texts["en-US"].DESCRIPTION)
  .setDescriptionLocalization("ko", texts["ko"].DESCRIPTION)
  .addSubcommand(add.data)
  .addSubcommand(manager.data)
  .addSubcommand(remove.data);

export async function execute(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();

  switch (subcommand) {
    case "add":
      await add.execute(interaction);
      break;
    case "manager":
      await manager.execute(interaction);
      break;
  }
}
