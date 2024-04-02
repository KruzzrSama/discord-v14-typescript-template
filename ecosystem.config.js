const fs = require("fs");
const path = require("path");

const apps = [];

const bots = fs.readdirSync(path.join(__dirname, "apps")).filter(b => b !== "shared" && !b.includes("!"));
bots.forEach(bot => {
    apps.push({
        name: bot.toUpperCase(),
        namespace: "Artech",
        exec_mode: "cluster",
        max_memory_restart: "2G",
        script: "index.js",
        watch: false,
        cwd: `./apps/${bot}`
    });
});


module.exports = {
    apps,
};