import { Collection, Snowflake } from "discord.js";
import { connection, Document, Schema, Types } from "mongoose";

type GuildDocument = Document & TMember;
export default connection.useDb(process.env.DB_NAME!).model<GuildDocument>("guild.member", new Schema({
    id: { type: String },
    level: { type: Object },
    info: { type: Object },
    crime: { type: Object },
    economy: { type: Object },
    inventory: { type: [Object] },
    logs: { type: Map },
    stats: { type: Object }
}));