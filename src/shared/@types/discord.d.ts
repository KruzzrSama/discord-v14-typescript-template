declare module "discord.js" {
    interface Message {
        xp(): void;
        append(): Promise<void>;
        command(): void;
        isCommand(): boolean;
    }

    interface GuildMember {
        setRoles(roles: Snowflake[]): Promise<GuildMember>;
    }

    interface Guild {
        test(): Promise<Guild>;
    }
}

export { }