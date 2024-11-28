import { @Vigilant, @TextProperty, @ButtonProperty, @SliderProperty } from 'Vigilance';

@Vigilant("PestFarming")
class Settings {
    @SliderProperty({
      name: "Pest cooldown reduction",
      description: "Your total pest cooldown reduction percentage (e.g. Pest Vest = 20, squeaky reforge = 1)",
      category: "General",
      min: 0,
      max: 50,
    })
    cooldownReduction = 20;

    @TextProperty({
        name: "Alert Sound",
        description: "The sound played for the alert",
        category: "General",
        placeholder: "random.anvil_land"
    })
    alertSound = "random.anvil_land";

    @ButtonProperty({
      name: "Open Sounds",
      description: "Opens a list of available sounds",
      category: "General",
      placeholder: "Open"
  })
  buttonAction() {
    java.awt.Desktop.getDesktop().browse(new java.net.URI("https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/mapping-and-modding-tutorials/2213619-1-8-all-playsound-sound-arguments"));
  }
    
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "Some general settings...")
    }
}

export default new Settings();
