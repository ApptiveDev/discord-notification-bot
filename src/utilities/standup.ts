import prisma from "@/utilities/prisma";
import { AutocompleteInteraction } from "discord.js";

export async function standupAutocomplete(interaction: AutocompleteInteraction) {
  const focused = interaction.options.getFocused(true);
  const guildId = interaction.guildId;
  const authorId = interaction.user.id;

  if (!guildId) return [];
  
  const choices = await prisma.standUp.findMany({
    where: {
      name: {
        startsWith: focused.value
      },
      guildId,
      authorId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return choices.map((choice) => ({
    name: choice.name,
    value: choice.id,
  }));
}
