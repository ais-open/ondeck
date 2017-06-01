import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts, ShortcutManager } from 'react-shortcuts';
import ReactModal from 'react-modal';

import ConfigurationManager from '../config';
import MapComponent from '../components/map';
import SettingsForm from '../components/settings';
import Keymap from './HomePageKeymap';


class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.configurationManager = new ConfigurationManager();
        this.shortcutManager = new ShortcutManager(Keymap);

        const config = this.configurationManager.getConfig();
        this.state = {
            isModalOpen: false,
            configuration: config
        };

        this.setModalState = this.setModalState.bind(this);
        this.updateConfiguration = this.updateConfiguration.bind(this);
        this.resetConfiguration = this.resetConfiguration.bind(this);
    }

    getChildContext() {
        return {
            shortcuts: this.shortcutManager
        };
    }

    setModalState(action) {
        if (action === 'OPEN') {
            this.setState({
                isModalOpen: true
            });
        }
        else {
            this.setState({
                isModalOpen: false
            });
        }
    }

    updateConfiguration(newConfig) {
        console.log('Updating configuration to ' + JSON.stringify(newConfig));
        this.configurationManager.saveConfig(newConfig);
        //location.reload();
        /*
         * Ok, why location.reload()?
         * The map below renders to a webgl context so when there are no dom
         * changes when the state changes so the map doesn't re-render. This
         * is a cheap way to get it done until I can figure out how to do it
         * properly and just call setState like a normal person.
         */
        this.setState({
            configuration: newConfig
        });
    }

    resetConfiguration() {
        console.log('Resetting configuration...');
        this.configurationManager.reset();
        //location.reload();
        // see note in updateConfiguration()
        this.setState({
            configuration: this.configurationManager.getConfig()
        });
    }

    render() {
        let config = this.state.configuration;
        console.log('Rendering map with config: ' + JSON.stringify(config));

        return (
            <Shortcuts name="SETTINGS" handler={this.setModalState}>
                <MapComponent configuration={config} />
                <ReactModal isOpen={this.state.isModalOpen}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            backgroundColor: '#eee'
                        }
                    }}
                    contentLabel="On Deck Settings">
                    <SettingsForm config={config}
                        onClose={this.setModalState}
                        onReset={this.resetConfiguration}
                        onSave={this.updateConfiguration} />
                </ReactModal>
            </Shortcuts>
        );
    }
}

HomePage.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

export default HomePage;
