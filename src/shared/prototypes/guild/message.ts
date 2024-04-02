import { Message } from "discord.js";

Message.prototype.append = async function (): Promise<void> {
    /**
     * Mesaj gönderildiğinde çalışacak ilk fonksiyon.
     * Bu kısımda örneğin mesajı yazan kullanıcının veritabanında girdisi yoksa oluşturulabilir.
     * Gerisi size kalmış.
     */
}

Message.prototype.xp = async function () {
    /**
     * Mesaj Xp işlemlerinin hesaplanacağı, yapılacağı ve dataya ekleneceği yer.
     */
}

/**
 * Gelen mesaj eğer komutsa tanımlanmış kodları çalıştırır çalıştırır.
 */
Message.prototype.command = async function () {
    let args = this.content.substring(client.prefix.length).split(" ");
    const command = client.commands.get(args[0].toLocaleLowerCase()) || client.aliases.get(args[0].toLocaleLowerCase());
    args = args.splice(1);


    if (!command || !this.content.startsWith(client.prefix) || this.member.user.bot) return;
    if (command.permission.length > 0) {
        // bir alt satırda eğer komutu perm ile kısıtlarsam asla erişimi kısıtlanmayacak kişi id'lerini veya rol idlerini girebilirim.
        command.permission.push(...client.owners, this.guild.ownerId);
        if (!command.permission.some(
            perm =>
                this.member.id == perm ||
                this.member.roles.cache.has(perm) ||
                this.member.permissions.has(perm)
        )) return;
    }

    command.execute(this, args);
}
/**
 * Gelen Mesajın bir komut, ve commands klasörü içinde olup olmadığını kontrol eder.
 */
Message.prototype.isCommand = function (): boolean {
    let args = this.content.substring(client.prefix.length).split(" ");
    const command = client.commands.get(args[0].toLocaleLowerCase()) || client.aliases.get(args[0].toLocaleLowerCase());

    return (command && this.content.startsWith(client.prefix)) ? true : false;
}