import request from "../requestV2";

const File = Java.type("java.io.File");
const AudioSystem = Java.type("javax.sound.sampled.AudioSystem");

function playSystemSound(filePath) {
    try {
        let soundFile = new File(filePath);
        let audioStream = AudioSystem.getAudioInputStream(soundFile);
        let clip = AudioSystem.getClip();
        clip.open(audioStream);
        clip.start();
    } catch (error) {
        ChatLib.chat("&cError playing sound: " + error);
    }
}

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

        playSystemSound("./config/ChatTriggers/modules/PestFarming/assets/anvil-drop.wav");
    }, cooldown);
}).setCriteria("&r&6&lYUCK!").setContains();
