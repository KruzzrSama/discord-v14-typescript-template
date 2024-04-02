import { Collection, Snowflake } from "discord.js";
import { connection, Document, Schema, Types } from "mongoose";

type GuildDocument = Document & TGuild;
export default connection.useDb(process.env.DB_NAME!).model<GuildDocument>("guild", new Schema({
    id: { type: String },
    properties: { type: Map },
    caches: { type: Map }
}));