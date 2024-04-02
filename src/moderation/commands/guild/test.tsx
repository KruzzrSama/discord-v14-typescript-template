import { Message } from "discord.js";
import Artech from "../../../shared/client.base";
import Command from "../../../shared/command.base";

export default class CommandName extends Command {
    constructor(client: Artech) {
        super(client, {
            name: "test",
            aliases: ["t"],
        });
    }

    async execute(message: Message, args: string[]) {
        message.reply({ content: `Test, args: ${args.join(", ")}` });
    }
}