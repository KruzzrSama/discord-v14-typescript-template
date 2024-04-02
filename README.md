
# TypeScript Discord v14 Bot

TypesSript, PM2 ve discord.js v14 kullanarak yazılan ve geliştirmeye açık olan bir bot.

**Not**: Bu proje tam olarak bir bot sunmamaktadır, kişisel geliştirebileceğiniz bir altyapı sunmaktadır

### İndirme
Indirdiğinizde proje dosyasının içinde bir konsol çalıştırın veya kullandığınız code editörün kendi terminalini açın ve içine şu komutu yazın;

MacOS or Linux;
```bash
bun install
```

Windows;
```bash
npm install
```

Macos veya Linux kullanıp da Bun kullanmıyorsanız **npm** kullanabilirsiniz.

### Kurulum ve Araylar

Eğer Bun kullanmıyorsanız **`package.json`** içerisindeki **"scripts"** objesini alttaki ile değiştirebilirsiniz!

```json
"scripts": {
    "fs": "npm run build && npm run flush && npm run kill && npm run start && npm run logs",
    "start": "pm2 start",
    "res": "pm2 restart",
    "flush": "pm2 flush",
    "logs": "pm2 logs",
    "kill": "pm2 kill",
    "stop": "pm2 stop all",
    "build": "rm -rf ./apps && tsc --project tsconfig.json"
}
```

#### Bot Oluşturma

- Ana dizinde `src/` içerisine türkçe karakter içermeyen bir klasör oluşturun, örn. `src/test`.
- Oluşturulan klasörün içerisine bir **`index.ts`** dosyası oluşturun. Ismi index.ts olmak zorundadır!
- Oluşturduğumuz dosyanın içine şu kodları ekleyin;
```typescript
import Artech from "../shared/client.base";

global.client = new Artech({
    token: "bot tokeni",
    prefix: "prefix örn d.",
    name: "bot adı",
    dirname: "klasör ismi", // burası oluşturduğunuz klasörün ismi ile aynı olmak zorundadır, aksi takdirde çalışmaz.
});
```
genel yapısını bozmadan içerisindeki propları değiştirebilirsiniz.

Bot çalışmaya hazır!

#### Komut Oluşturma

- Komut eklemek için oluşturduğunuz klasörün içine `commands` isminde bir klasör oluşturun, bu şekilde görülmeli `src/test/commands/`, ardından onun içine bir klasör daha oluşturarak kategorize edebilirsiniz ama dikkat edin kategorize etmek zorunludur `src/test/commands/admin/`, oluşturduğunuz kategori klasörünün içine istediğiniz komut dosyasını oluşturabilirsiniz.
- Komut dosyasını oluşturmak için kategorinin içine gelip **`test.ts`** dosyası oluşturun, içerisine de alttaki kodları ekleyebilirsiniz;
```typescript
import { Message } from "discord.js";
import Artech from "../../../shared/client.base";
import Command from "../../../shared/command.base";

export default class CommandName extends Command {
    constructor(client: Artech) {
        super(client, {
            name: "komut kullanım",
            aliases: ["komut diğer kullanım"],
        });
    }

    async load(){
        // komut ilk yüklendiğinde çalışacak kısım. global.client veya client kullanabilirsiniz!
    }

    async execute(message: Message, args: string[]) {
        // komut kullandığında çalışacak kısım.
    }
}
```
- Slash komutu eklemek için normal komut oluşturur gibi kategorinin içine bu sefer `slash.test.ts` dosyası oluşturun, dikkat edin dosyanın başında `slash.` olmalıdır yoksa slash komutu olarak sayılmaz ve çalışmaz. içine ise alttaki kodları ekleyin;
```typescript
import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, InteractionType } from "discord.js";
import Artech from "../../../shared/client.base";
import SlashCommand from "../../../shared/slash.command.base";

export default class SlashCommandName extends SlashCommand {
    constructor(client: Artech) {
        super(client, {
            name: "slash komut adı",
            type: ApplicationCommandType.ChatInput,
        });
    }

    async load(){
        // komut ilk yüklendiğinde çalışacak kısım. global.client veya client kullanabilirsiniz!
    }

    async execute(interaction: CommandInteraction) {
        // komut kullandığında çalışacak kısım
    }
}
```
Komutların çalışması için `messageCreate` veya `interactionCreate` eventi oluşturmanıza gerek yoktur bunlar zaten komutlar yüklendiğinde default olarak oluşturuluyor.

#### Event Oluşturma

- Event eklemek için oluşturduğunuz klasörün içine `events` isminde bir klasör oluşturun, bu şekilde görülmeli `src/test/events/`. oluşturduğunuz klasörün içine istediğiniz event dosyasını oluşturabilirsiniz, örn. **`ready.ts`**. içine ise alttaki kodları ekleyebilirsiniz!
```typescript
import { Events, Message } from "discord.js";
import Artech from "../../../shared/client.base";
import Event from "../../../shared/event.base";

export default class Ready extends Event {
    constructor(client: Artech) {
        super(client, {
            name: Events.ClientReady, //Events. ile başlayarak istediğiniz eventi kullanabilirsiniz! alttaki listener'ın parametreleri de event'e göre değişebilir!
        });
    }

    async listener() {
        // Eventin çalıştıracağı kısım!
        // global.client veya client kullanabilirsiniz!
    }
}
```

Üstte olduğu gibi `commands` veya `events` klasörleri eğer botun içinde yoksa komut ve eventleri okumadan geçecektir, komut kullanmayacağınız botlarda direkt klasörü silin veya ismini değiştirin.


