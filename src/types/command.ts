import { CommandInteraction, Locale, SlashCommandBuilder } from "discord.js";

export type Command = {
  data: SlashCommandBuilder,
  execute: (interaction: CommandInteraction) => void
}

export type Replies = Partial<Record<Locale, string>>;