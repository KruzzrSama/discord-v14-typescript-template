import "dotenv/config";
import { Client, Collection, CommandInteraction, Events, GatewayIntentBits, InteractionType, Partials } from "discord.js";
import fs from "fs";
import { Database, db } from "./database";
import Logger from "./logger";
import { getDir } from ".";
import Command from "./command.base";
import Event from "./event.base";
import SlashCommand from "./slash.command.base";

type ArtechOptions = { name: string, token: string, prefix: string, dirname: string; }
export default class Artech extends Client {
    owners: string[] = new Array();
    commands: Collection<string, Command> = new Collection<string, Command>();
    slashCommands: Collection<string, SlashCommand> = new Collection<string, SlashCommand>();
    aliases: Collection<string, Command> = new Collection<string, Command>();
    prefix: string;
    db: typeof db = db;
    private dirname: string;
    private static logger: Logger;
    constructor(options: ArtechOptions) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
            ],
            partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
        });
        this.token = options.token;
        this.owners = [process.env.OWNER!];
        this.dirname = options.dirname;
        this.prefix = options.prefix;

        Artech.logger = new Logger(options.name);
        (async () => {
            await this.usePrototypes();

            await this.useCommands();
            await this.useEvents();

            await this.connect();
        })();
    }

    private async useCommands() {
        const enabled: boolean = fs.existsSync(getDir(this.dirname, "commands"));
        if (!enabled) return;

        this.once(Events.ClientReady, () => { this.guilds.cache.map((g) => g.commands.set([])) });
        const categories = fs.readdirSync(getDir(this.dirname, "commands"), { encoding: "utf-8" });
        await Promise.all(categories.map(async (category) => {
            const files = fs.readdirSync(getDir(this.dirname, "commands", category), { encoding: "utf-8" });
            await Promise.all(files.map(async (file) => {
                const command: Command | SlashCommand = (await import(getDir(this.dirname, "commands", category, file)).then(d => new d.default(this)));
                if (command) command.on();
            }));
        }));

        if (this.commands.size > 0) {
            this.on(Events.MessageCreate, async (message) => {
                await message.append();
                message.xp();
                message.command();
            });
        }

        if (this.slashCommands.size > 0) {
            this.on(Events.InteractionCreate, async (interaction) => {
                switch (interaction.type) {
                    case InteractionType.ApplicationCommand:
                        const command = client.slashCommands.get(interaction.commandName);
                        command.execute(interaction);
                        break;
                }
            });
        }
    }

    private async usePrototypes() {
        const categories = fs.readdirSync(getDir("shared", "prototypes"), { encoding: "utf-8" });
        await Promise.all(categories.map(async (category) => {
            const files = fs.readdirSync(getDir("shared", "prototypes", category), { encoding: "utf-8" });
            await Promise.all(files.map(async (file) => {
                import(getDir("shared", "prototypes", category, file));
            }));
        }));
    }

    private async useEvents() {
        const enabled: boolean = fs.existsSync(getDir(this.dirname, "events"));
        if (!enabled) return;
        const events = fs.readdirSync(getDir(this.dirname, "events"), { encoding: "utf-8" });
        await Promise.all(events.map(async (file) => {
            const event: Event = (await import(getDir(this.dirname, "events", file)).then(d => new d.default(this)));
            if (event) event.on();
        }));
    }

    private async connect() {
        await Database.init().then(async () => {
            await this.login(this.token!).then(() => {
                Artech.logger.success(`Bot statarted! DB's ready!`);
                this.on(Events.ClientReady, () => {
                    // bot hazır olduğunda çalıştırılkacak init gerektiren fonks, class?
                });
            });
        }).catch((err) => {
            Artech.logger.error(`Database connection error: \`${err}\``);
        });
    }
}