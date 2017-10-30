const KEY = 'ondeck.configuration';

export default class ConfigurationManager {
    constructor(defaultConfig) {
        this.defaultConfig = defaultConfig;
    }

    getConfig() {
        // Try to return whatever is stored in localStorage
        const saved = localStorage.getItem(KEY);
        if (saved) {
            const savedObj = JSON.parse(saved);
            if (savedObj.version && (savedObj.version >= this.defaultConfig.version)) {
                return savedObj;
            }
            console.log(`Stored version was ${savedObj.version} - upgrading to ${this.defaultConfig.version}`);
        }

        // Else, it's their first time or they have an outdated config...
        // give them our defaults from app-config.json
        const conf = Object.assign({}, this.defaultConfig);
        this.saveConfig(conf);
        return conf;
    }

    saveConfig(config) {
        const c = JSON.stringify(config);
        //console.log('Saving configuration: ' + c);
        localStorage.setItem(KEY, c);
    }

    reset() {
        let conf = Object.assign({}, this.defaultConfig);
        this.saveConfig(conf);
    }
}
