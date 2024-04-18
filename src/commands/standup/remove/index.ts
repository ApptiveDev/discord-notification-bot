import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import prisma from "@/utilities/prisma";
import { handlePermission } from "@/utilities/handler";
import { getLocaleTexts } from "@/utilities/texts";
import texts from "./texts.json";
import { standupAutocomplete } from "@/utilities/standup";

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
        .setAutocomplete(true)
    );

export const autocomplete = async (interaction: AutocompleteInteraction) => {
  const focused = interaction.options.getFocused(true);

  if (!interaction.guildId) return;

  switch (focused.name) {
    case "name":
      await interaction.respond(await standupAutocomplete(interaction));
  }
};

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const name = interaction.options.getString("name", true);
  const localeTexts = getLocaleTexts(texts, interaction.locale);

  if (!interaction.guildId) return;
  if (!(await handlePermission(interaction, true))) return;

  // author, guildId가 일치하는지 확인
  const standUp = await prisma.standUp.findFirst({
    where: {
      name: {
        startsWith: name,
      },
      guildId: interaction.guildId,
      authorId: interaction.user.id,
    },
  });

  if (!standUp) {
    await interaction.reply({
      content: localeTexts.ERROR_NOT_FOUND,
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    content: localeTexts.REPLY_SUCCESS.replace("${name}", standUp.name),
    ephemeral: true,
  });
};
