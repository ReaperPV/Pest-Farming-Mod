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

register("chat", (player, event) => {
    setTimeout(() => {
        ChatLib.chat("&2&lPest Farming: &c&lSwap Armour Now!");

        Client.showTitle("&c&lSwap Armour Now!", "You stupid idiot", 0.5, 50, 0.5);

        playSystemSound("/assets/anvil-drop.wav");

    }, 55000);
}).setCriteria("&r&6&lYUCK!").setContains();
