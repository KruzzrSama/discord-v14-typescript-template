import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, InteractionType } from "discord.js";
import Artech from "../../../shared/client.base";
import SlashCommand from "../../../shared/slash.command.base";

export default class SlashCommandName extends SlashCommand {
    constructor(client: Artech) {
        super(client, {
            name: "testslash",
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: "mention",
                    description: "Sunucu üye etiket veya id'si",
                    type: ApplicationCommandOptionType.Mentionable,
                    required: true,
                },
                {
                    name: "test",
                    description: "test parametre",
                    type: ApplicationCommandOptionType.String,
                    minLength: 2,
                    maxLength: 12,
                    required: false
                }
            ]
        });
    }

    async execute(interaction: CommandInteraction) {
        interaction.reply({ content: "Slash command test reply" });
    }
}