import {
  ChannelType,
  CommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { handlePermission } from "@/utilities/handler";
import prisma from "@/utilities/prisma";
import { getLocaleTexts } from "@/utilities/texts";
import texts from "./texts.json";
import { getWeekdayIntegerChoices } from "@/utilities/weekday";

export const data = (builder: SlashCommandSubcommandBuilder) =>
  builder
    .setName(texts["en-US"].NAME)
    .setNameLocalization("ko", texts["ko"].NAME)
    .setDescription(texts["en-US"].DESCRIPTION)
    .setDescriptionLocalization("ko", texts["ko"].DESCRIPTION)
    .addStringOption((option) =>
      option
        .setName(texts["en-US"].OPTION_NAME_NAME)
        .setNameLocalization("ko", texts["ko"].OPTION_NAME_NAME)
        .setDescription(texts["en-US"].OPTION_NAME_DESCRIPTION)
        .setDescriptionLocalization("ko", texts["ko"].OPTION_NAME_DESCRIPTION)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName(texts["en-US"].OPTION_ROLE_NAME)
        .setNameLocalization("ko", texts["ko"].OPTION_ROLE_NAME)
        .setDescription(texts["en-US"].OPTION_ROLE_DESCRIPTION)
        .setDescriptionLocalization("ko", texts["ko"].OPTION_ROLE_DESCRIPTION)
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName(texts["en-US"].OPTION_CHANNEL_NAME)
        .setNameLocalization("ko", texts["ko"].OPTION_CHANNEL_NAME)
        .setDescription(texts["en-US"].OPTION_CHANNEL_DESCRIPTION)
        .setDescriptionLocalization(
          "ko",
          texts["ko"].OPTION_CHANNEL_DESCRIPTION
        )
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName(texts["en-US"].OPTION_DAY_NAME)
        .setNameLocalization("ko", texts["ko"].OPTION_DAY_NAME)
        .setDescription(texts["en-US"].OPTION_DAY_DESCRIPTION)
        .setDescriptionLocalization("ko", texts["ko"].OPTION_DAY_DESCRIPTION)
        .setRequired(true)
        .addChoices(...getWeekdayIntegerChoices())
    );

export async function execute(interaction: CommandInteraction) {
  const name = interaction.options.get("name", true).value as string;
  const role = interaction.options.get("role", true).role;
  const channel = interaction.options.get("channel", true).channel;
  const weekday = interaction.options.get("day", true).value as number;

  // 적절한 권한을 가지고 있는지 확인
  if (!role || !channel || !interaction.guild) return;
  if (!(await handlePermission(interaction))) return;

  const localeTexts = getLocaleTexts(texts, interaction.locale);

  // check already exists
  const standUp = await prisma.standUp.findFirst({
    where: {
      guildId: interaction.guild.id,
      name,
    },
  });

  if (standUp) {
    await interaction.reply({
      content: localeTexts.ERROR_ALREADY_EXISTS,
      ephemeral: true,
    });
    return;
  }

  prisma.standUp.create({
    data: {
      name,
      guildId: interaction.guild.id,
      roleId: role.id,
      channelId: channel.id,
      weekDay: weekday,
      authorId: interaction.user.id,
    },
  });

  await interaction.reply({
    content: localeTexts.REPLY_SUCCESS.replace("${name}", name),
    ephemeral: true,
  });
}
