Hooks.once("init", () => {
    if(moduleEnabled("splatter")) {
        game.settings.registerMenu("dsa5-glueandhammer", "configureSplatter", {
            name: game.i18n.localize("DSASETTINGS.configureSplatter"),
            label: game.i18n.localize("DSASETTINGS.configureSplatter"),
            hint: game.i18n.localize("DSASETTINGS.configureSplatterHint"),
            type: ConfigureSplatter,
            restricted: false
        })    }
    
})

class ConfigureSplatter extends FormApplication {
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