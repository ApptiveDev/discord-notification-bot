import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("standup-add")
  .setDescription("스탠드업 공지 스케줄을 등록합니다.")

export async function execute(interaction: CommandInteraction) {
  
}