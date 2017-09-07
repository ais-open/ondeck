import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts, ShortcutManager } from 'react-shortcuts';

import ConfigurationManager from '../config';
import MapComponent from '../components/map';
import SettingsPane from '../components/settings/SettingsPane';
import Keymap from './HomePageKeymap';


class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.configurationManager = new ConfigurationManager();
        this.shortcutManager = new ShortcutManager(Keymap);

        const config = this.configurationManager.getConfig();
        this.state = {
            areSettingsOpen: false,
            configuration: config
        };

        this.saveConfiguration = this.saveConfiguration.bind(this);
        this.setSettingsPaneVisibility = this.setSettingsPaneVisibility.bind(this);
        this.resetConfiguration = this.resetConfiguration.bind(this);
        this.updateConfiguration = this.updateConfiguration.bind(this);
    }

    getChildContext() {
        return {
            shortcuts: this.shortcutManager
        };
    }

    setSettingsPaneVisibility(action) {
        if (action === 'OPEN') {
            let toggled = !this.state.areSettingsOpen;
            this.setState({
                areSettingsOpen: toggled
            });
        }
        else {
            this.setState({
                areSettingsOpen: false
            });
        }
    }

    updateConfiguration(newConfig) {
        //console.log('Updating configuration to ' + JSON.stringify(newConfig));
        this.setState({
            configuration: newConfig
        });
    }
    
    saveConfiguration(newConfig) {
        this.configurationManager.saveConfig(newConfig);
        this.updateConfiguration(newConfig);
    }

    resetConfiguration() {
        this.configurationManager.reset();
        this.setState({
            configuration: this.configurationManager.getConfig()
        });
    }

    render() {
        let config = this.state.configuration;
        //console.log('Rendering map with config: ' + JSON.stringify(config));

        return (
            <Shortcuts name="SETTINGS" handler={this.setSettingsPaneVisibility}>
                <MapComponent configuration={config} />
                <SettingsPane 
                    configuration={config}
                    isOpen={this.state.areSettingsOpen} 
                    onChange={this.updateConfiguration}
                    onClose={this.setSettingsPaneVisibility} 
                    onReset={this.resetConfiguration} 
                    onSave={this.saveConfiguration} />
            </Shortcuts>
        );
    }
}

HomePage.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

export default HomePage;
