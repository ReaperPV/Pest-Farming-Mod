import Settings from "./settings";
import request from "../requestV2";

const alertSound = Settings.alertSound ? Settings.alertSound : "random.anvil_land";
let toggleSounds = false;

register("command", () => Settings.openGUI()).setName("pf").setAliases('pestfarming');

register("command", () => {
    toggleSounds = !toggleSounds;
    ChatLib.chat(`&2&lPestFarming: &aSounds &r${!toggleSounds ? "&aEnabled" : "&cDisabled"}`);
}).setName("togglesounds")

register('soundPlay', (pos, name, vol, pitch, cat, event) => {
    if (!toggleSounds) return;
    if (name !== alertSound) cancel(event);
})

let sprayReduction = 2;

request({
    url: 'https://api.hypixel.net/v2/resources/skyblock/election',
    json: true
})
.then((response) => {
    if (response.mayor.perks.some(perk => perk.name === "Pest Eradicator") || response.mayor.minister.perk.name === "Pest Eradicator") {
        sprayReduction = 4;
    }
})
.catch((err) => console.error(`PestFarming: ${err.cause ?? err}`));

register("chat", (player, event) => {
    const cooldownReduction = Settings.cooldownReduction ? Settings.cooldownReduction : 20;
    const cooldown = (300000 / sprayReduction ) * (1 - (cooldownReduction / 100));

    setTimeout(() => {
        ChatLib.chat("&2&lPest Farming: &c&lSwap Armour Now!");

        Client.showTitle("&c&lSwap Armour Now!", "You stupid idiot", 0.5, 50, 0.5);

        World.playSound(alertSound, 1, 1);
    }, cooldown - 5000);
}).setCriteria("&r&6&lYUCK!").setContains();
