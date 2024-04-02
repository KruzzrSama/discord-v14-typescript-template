import { Message } from "discord.js";
import Artech from "./client.base";
import Logger from "./logger";
type CommandProps = { name: string; description?: string; usage?: string; aliases?: string[]; enabled?: boolean; permission?: any[]; delay?: number; }
export default class Command {
    client: Artech;
    name: string;
    description: string = "Description is not defined";
    usage: string = "Usage is not defined";
    aliases: string[] = [];
    enabled: boolean = true;
    permission: any[] = [];
    delay: number = 5000;
    private static logger: Logger = new Logger("Command");
    load() { };
    async execute(message: Message, args: string[]) { };
    constructor(client: Artech, props: CommandProps) {
        this.client = client;
        this.name = props.name;
        if (props.description) this.description = props.description;
        if (props.usage) this.usage = props.usage;
        if (props.aliases) this.aliases = props.aliases;
        if (props.enabled) this.enabled = props.enabled;
        if (props.permission) this.permission = props.permission;
        if (props.delay) this.delay = props.delay;
        if (this.load) this.load();
    }

    public on() {
        if (!this.enabled) return;
        this.client.commands.set(this.name, this);
        if (this.aliases && this.aliases.length > 0) this.aliases.forEach(alias => this.client.aliases.set(alias, this));
    }
}