import { CommandInteraction, GuildMemberRoleManager, Locale } from "discord.js";
import prisma from "./prisma";
import { Replies } from "../types/command";

export async function checkPermission(interaction: CommandInteraction, onlyOwnerCheck: boolean = false) {
  if (!interaction.guild) return;

  const isOwner = interaction.user.id === interaction.guild.ownerId;
  if (onlyOwnerCheck) return isOwner;

  const managerRole = await prisma.guild.findUnique({
    where: { id: interaction.guild.id },
  }).then((guild) => guild?.managerRole);

  if (!managerRole) return isOwner;

  const userRoles = interaction.member?.roles;
  if (!(userRoles instanceof GuildMemberRoleManager)) return isOwner;

  return isOwner || userRoles.cache.has(managerRole);
}

export async function handlePermission(interaction: CommandInteraction, onlyOwnerCheck: boolean = false) {
  const hasPermission = await checkPermission(interaction, onlyOwnerCheck);

  if (!hasPermission) {
    const replies: Replies = {
      "ko": "이 명령어를 사용할 수 있는 권한이 없습니다.",
    }

    await interaction.reply({
      content: replies[interaction.locale] ?? "You do not have permission to use this command.",
      ephemeral: true,
    });
  }

  return hasPermission;
}