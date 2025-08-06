import { AnimationLoader } from "./animationsimporter.js";

Hooks.once("init", () => {
    if (moduleEnabled("splatter")) {
        game.settings.registerMenu("dsa5-glueandhammer", "configureSplatter", {
            name: "DSASETTINGS.configureSplatter",
            label: "DSASETTINGS.configureSplatter",
            hint: "DSASETTINGS.configureSplatterHint",
            type: ConfigureSplatter,
            restricted: false
        })
    }
    game.settings.registerMenu('dsa5-glueandhammer', 'configureAutomatedAnimations', {
        name: "DSASETTINGS.configureAutomatedAnimations",
        label: "DSASETTINGS.configureAutomatedAnimations",
        hint: "DSASETTINGS.configureAutomatedAnimationsHint",
        type: AnimationLoader,
        restricted: true,
    });
})

class ConfigureSplatter extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
    async render() {
        await game.settings.set("splatter", "creatureType", "creatureType")
        await game.settings.set("splatter", "currentHp", "status.wounds.value")
        await game.settings.set("splatter", "maxHp", "status.wounds.max")
        game.settings.sheet.render(true)
        ui.notifications.warn("Splatter configuration finished")
    }
}


function moduleEnabled(id) {
    return game.modules.get(id) && game.modules.get(id).active
}