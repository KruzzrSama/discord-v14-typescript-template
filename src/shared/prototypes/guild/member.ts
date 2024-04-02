import { Collection, Guild, GuildMember, Snowflake } from "discord.js";
import { db } from "../../database";

/**
 * Sunucu üyesinin rollerini verilen rollerle değiştirir.
 */
GuildMember.prototype.setRoles = async function (roles: Snowflake[]): Promise<GuildMember> {
    const roleList = this.roles.cache.clone().filter(r => r.managed).map(r => r.id).concat(roles);
    return this.roles.set(roleList);
};