
const KEY = 'ondeck.configuration';

export default class ConfigurationManager {

    constructor() {
        this.defaultConfig = APP_CONFIG;
    }

    getConfig() {
        // Try to return whatever is stored in localStorage
        let ls = localStorage.getItem(KEY);
        if (ls) {
            return JSON.parse(ls);
        }

        // Else, it's their first time... give them our
        // defaults from app-config.js
        let conf = Object.assign({}, this.defaultConfig);
        this.saveConfig(conf);
        return conf;
    }

    saveConfig(config) {
        const c = JSON.stringify(config);
        console.log('Saving configuration: ' + c);
        localStorage.setItem(KEY, c);
    }

    reset() {
        let conf = Object.assign({}, this.defaultConfig);
        this.saveConfig(conf);
    }
}
