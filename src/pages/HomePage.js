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

        this.setSettingsPaneVisibility = this.setSettingsPaneVisibility.bind(this);
        this.updateConfiguration = this.updateConfiguration.bind(this);
        this.resetConfiguration = this.resetConfiguration.bind(this);
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
        console.log('Updating configuration to ' + JSON.stringify(newConfig));
        this.configurationManager.saveConfig(newConfig);
        this.setState({
            configuration: newConfig
        });
    }

    resetConfiguration() {
        console.log('Resetting configuration...');
        this.configurationManager.reset();
        this.setState({
            configuration: this.configurationManager.getConfig()
        });
    }

    render() {
        let config = this.state.configuration;
        console.log('Rendering map with config: ' + JSON.stringify(config));

        //     <SettingsForm config={config}
        //         onClose={this.setModalState}
        //         onReset={this.resetConfiguration}
        //         onSave={this.updateConfiguration} />

        return (
            <Shortcuts name="SETTINGS" handler={this.setSettingsPaneVisibility}>
                <MapComponent configuration={config} />
                <SettingsPane 
                    configuration={config}
                    isOpen={this.state.areSettingsOpen} 
                    onClose={this.setSettingsPaneVisibility} 
                    onReset={this.resetConfiguration} 
                    onSave={this.updateConfiguration} />
            </Shortcuts>
        );
    }
}

HomePage.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

export default HomePage;
