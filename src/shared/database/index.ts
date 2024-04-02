import Logger from "../logger";
import mongoose from "mongoose";
import guild from "./schemas/guild";
import guildMember from "./schemas/guild/member";
export class Database {
    public static async init() {
        await mongoose.connect(process.env.DB_URL!);
    }
}

export const db = { guild, guildMember };