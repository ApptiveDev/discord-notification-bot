import {
  CommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import prisma from "@/utilities/prisma";
import { handlePermission } from "@/utilities/handler";
import { getLocaleTexts } from "@/utilities/texts";
import texts from "./texts.json";

export const data = (builder: SlashCommandSubcommandBuilder) =>
  builder
    .setName(texts["en-US"].NAME)
    .setNameLocalization("ko", texts["ko"].NAME)
    .setDescription(texts["en-US"].DESCRIPTION)
    .setDescriptionLocalization("ko", texts["ko"].DESCRIPTION)
    .addRoleOption((option) =>
      option
        .setName(texts["en-US"].OPTION_ROLE_NAME)
        .setNameLocalization("ko", texts["ko"].OPTION_ROLE_NAME)
        .setDescription(texts["en-US"].OPTION_ROLE_DESCRIPTION)
        .setDescriptionLocalization("ko", texts["ko"].OPTION_ROLE_DESCRIPTION)
        .setRequired(true)
    );

export async function execute(interaction: CommandInteraction) {
  const role = interaction.options.get("role", true).role;
  const localeTexts = getLocaleTexts(texts, interaction.locale);

  // 적절한 권한을 가지고 있는지 확인
  if (!role || !interaction.guild) return;
  if (!(await handlePermission(interaction, true))) return;

  prisma.guild.upsert({
    where: { id: interaction.guild.id },
    create: {
      managerRole: role.id,
    },
    update: {
      managerRole: role.id,
    },
  });

  await interaction.reply({
    content: localeTexts.REPLY_SUCCESS.replace("${role}", role.name),
    ephemeral: true,
  });
}
