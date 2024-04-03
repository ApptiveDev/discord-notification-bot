import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("standup-delete")
  .setDescription("등록된 스탠드업 공지 스케줄을 삭제합니다.")

export async function execute(interaction: CommandInteraction) {
  
}