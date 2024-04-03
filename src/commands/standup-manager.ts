import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("standup-manager")
  .setDescription("스탠드업 공지 스케줄의 관리자 역할을 지정합니다.")

export async function execute(interaction: CommandInteraction) {
  
}