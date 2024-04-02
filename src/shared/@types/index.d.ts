import { Collection, Snowflake } from "discord.js";
import Artech from "../client.base";

declare global {
    var client: Artech;
    type TMember = {
        id: Snowflake;
        level: TLevel;
        info: TMemberInfo;
        crime: { point: number };
        economy: TMemberEconomy;
        inventory: Array<TInventoryItem>;
        logs: Collection<string, any[]>;
        stats: TMemberStats;
    }

    type TLevel = {
        voice: { xp: number; current: number; };
        chat: { xp: number; current: number; };
    }
    type TMemberInfo = {
        name: string;
        gender: TMemberGender;
        birth?: number;
        about: string;
    }
    type TMemberStats = { voice: HMS; stream: HMS; message: MSGT; }
    type MSGT = { long: number; medium: number; short: number };
    type HMS = { hour: number; minute: number; second: number };
    type TInventoryItem = { key: string; name: string; count: number; max: number; }
    type TMemberEconomy = { daily: number; coin: number; gold: number; }
    type Prop = boolean | string | number | object;

    type TGuild = { id: Snowflake, properties: Collection<string, any>; caches: Collection<string, any>; }
    const enum LocalDateFormat { NormalDateWithHoursToSeconds, HoursToSeconds, NormalDate, HoursToMinutes, MinutesToSeconds, FromNow }
}

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

export { };