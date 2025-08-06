export class AnimationLoader extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
    static DEFAULT_OPTIONS = {
        window: { title: 'DSASETTINGS.configureAutomatedAnimations' },
        position: {
            width: 550
        },
        actions: {
            overwrite: this._importAnimations,
            merge: this._importAnimations,
        }
    };

    static PARTS = {
        main: {
            template: 'modules/dsa5-glueandhammer/templates/automatedanimations.hbs',
        },
    };

    async _prepareContext(_options) {
        const data = await super._prepareContext(_options);
        const id = "autoanimations"
        data.activated = game.modules.get(id) && game.modules.get(id).active
        return data
    }

    static async _importAnimations(ev, target) {
        const mode = target.dataset.action;
        const lang = game.i18n.lang === "de" ? "de" : "en";
        const fileName = `modules/dsa5-glueandhammer/configs/automatedanimations/fvtt-AutomatedAnimations-GlobalMenu-dsa5-${lang}.json`;
        const fileContent = await foundry.utils.fetchJsonWithTimeout(fileName);

        if( mode == 'overwrite') {
            AutomatedAnimations.AutorecManager.overwriteMenus(JSON.stringify(fileContent), { submitAll: true });
        } else {
            AutomatedAnimations.AutorecManager.mergeMenus(JSON.stringify(fileContent), { submitAll: true });
        }
        
        this.close()
    }
}

