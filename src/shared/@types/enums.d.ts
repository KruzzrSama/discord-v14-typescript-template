declare global {
    const enum TMemberGender { Male = "male", Female = "female" }

    const enum MemberLogKeys {
        Registerations = "registeration",
        Nicknames = "nicknames",
    }
    const enum GuildPropList {
        GuildColor = "guild-color",
        GuildTag = "guild-tag",
        LevelMultiplier = "level-multiplier",

        ChannelsGeneral = "channels-general-chat",

        RolesRegistered = "roles-registered",
        RolesUnregistered = "roles-unregistered",
        RolesGenderMale = "roles-gender-male",
        RolesGenderFemale = "roles-gender-female",
        RolesTag = "roles-tag",
        RolesNewbie = "roles-newbie",

        SystemGenderRole = "system-gender-role",
        SystemTagRole = "system-tag-role",
        SystemRegisterRole = "system-register-role",
        SystemNewbie = "system-newbie",

        XpBlockChannels = "xp-block-channels",
    }

    const enum ComponentType { Rank, TopStatistics, MemberStatistics }
}


export { };