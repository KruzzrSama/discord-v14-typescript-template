import { Guild } from "discord.js";


Guild.prototype.test = async function (): Promise<Guild> {
    /**
     * Guild test komutu
     */

    return this;
}