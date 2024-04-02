import { ApplicationCommandDataResolvable, ApplicationCommandOption, ApplicationCommandType, CommandInteraction, Events, InteractionType } from "discord.js";
import Artech from "./client.base";
import { db } from "./database";

type SlashCommandProps = { name: string; type: ApplicationCommandType; options: ApplicationCommandOption[], description?: string; enabled?: boolean; }
export default class SlashCommand {
    client: Artech;
    name: string;
    options: ApplicationCommandOption[];
    description: string = "Description is not defined";
    enabled: boolean = true;
    type: ApplicationCommandType;
    db: typeof db = db;
    load() { };
    execute(interaction: CommandInteraction) { };
    constructor(client: Artech, props: SlashCommandProps) {
        this.client = client;
        this.name = props.name;
        this.options = props.options;
        if (props.description) this.description = props.description;
        if (this.load) this.load();
    }
    public on() {
        if (!this.enabled) return;
        this.client.slashCommands.set(this.name, this);
        this.client.on(Events.ClientReady, (client) => {
            client.guilds.cache.map((g) => g.commands.create(this as ApplicationCommandDataResolvable));
        });
    }
}