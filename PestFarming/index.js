import request from "../requestV2";

let toggleSounds = false;

register("command", () => {
    toggleSounds = !toggleSounds;
    ChatLib.chat(`&2&lPestFarming: &aSounds &r${!toggleSounds ? "&aEnabled" : "&cDisabled"}`);
}).setName("pf").setAliases(["pestfarming"]);

register('soundPlay', (pos, name, vol, pitch, cat, event) => {
    if (!toggleSounds) return;
    if (name !== "random.anvil_land") cancel(event);
})

function isFinnegan() {
    return request({
        url: 'https://api.hypixel.net/v2/resources/skyblock/election',
        json: true
    })
    .then((response) => {
        return response.mayor.perks.some(perk => perk.name === "Pest Eradicator") || response.minister.perk.name === "Pest Eradicator";
    })
    .catch((err) => console.error(`PestFarming: ${err.cause ?? err}`));
}

const cooldown = isFinnegan() ? 55000 : 115000

register("chat", (player, event) => {
    setTimeout(() => {
        ChatLib.chat("&2&lPest Farming: &c&lSwap Armour Now!");

        Client.showTitle("&c&lSwap Armour Now!", "You stupid idiot", 0.5, 50, 0.5);

        World.playSound("random.anvil_land", 1, 1);
    }, cooldown);
}).setCriteria("&r&6&lYUCK!").setContains();
