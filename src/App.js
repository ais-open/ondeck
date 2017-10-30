import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import * as _ from 'lodash';

import ConfigurationManager from './ConfigurationManager';
import MapComponent from './map/component';
import './App.css';
import SettingsComponent from './settings/component';

class App extends Component {
    constructor(props) {
        super(props);

        this.configurationManager = new ConfigurationManager(JSON.parse(props.appConfig));
        const appConfig = this._initOverlaySettings();

        this.state = {
            configuration: appConfig,
            data: {},
            snackbar: {
                open: false,
                message: '',
                type: ''
            }
        };

        this._setData = this._setData.bind(this);
        this._updateViewport = this._updateViewport.bind(this);
        this._updateConfiguration = this._updateConfiguration.bind(this);
        this._saveConfiguration = this._saveConfiguration.bind(this);
        this._resetConfiguration = this._resetConfiguration.bind(this);
        this._handleSnackbarOpen = this._handleSnackbarOpen.bind(this);
        this._handleSnackbarClose = this._handleSnackbarClose.bind(this);
    }

    _initOverlaySettings() {
        const appConfig = this.configurationManager.getConfig();
        if (!appConfig.overlaySettings || _.keys(appConfig.overlaySettings).length === 0) {
            // clone settings of current overlay to root overlaySettings object for easy accessibility
            appConfig.overlaySettings = _.clone(appConfig.overlays[appConfig.overlay].settings);
        }
        return appConfig;
    }

    _setData(newData) {
        this.setState({
            data: newData
        });
    }

    _updateConfiguration(newConfig) {
        this.setState({
            configuration: newConfig
        });
    }

    _updateViewport(viewport) {
        const newConfig = Object.assign({}, this.state.configuration);
        newConfig.viewport = viewport;
        this._updateConfiguration(newConfig);
    }

    _saveConfiguration(newConfig) {
        this.configurationManager.saveConfig(newConfig);
        this._updateConfiguration(newConfig);
        this._handleSnackbarOpen('Settings Saved', 'success');
    }

    _resetConfiguration() {
        this.configurationManager.reset();
        const appConfig = this._initOverlaySettings();
        this._updateConfiguration(appConfig);
        this._handleSnackbarOpen('Settings Reset', 'success');
    }

    _handleSnackbarOpen(message, type) {
        const newSnackbar = {
            open: true,
            message: message,
            type: type
        };
        this.setState({
            snackbar: newSnackbar
        });
    }

    _handleSnackbarClose() {
        const newSnackbar = {
            open: false,
            message: '',
            type: ''
        };
        this.setState({
            snackbar: newSnackbar
        });
    }

    render() {
        let snackbarBodyStyle = {};
        if (this.state.snackbar.type === 'success') {
            snackbarBodyStyle = {
                backgroundColor: 'rgba(15, 125, 19, 0.8)'
            };
        } else {
            snackbarBodyStyle = {
                backgroundColor: 'rgba(144, 23, 23, 0.8)'
            }
        }

        return (
            <div className="App">
                <SettingsComponent config={this.state.configuration} data={this.state.data} onSave={this._saveConfiguration}
                                   onReset={this._resetConfiguration} onChange={this._updateConfiguration}/>
                <MapComponent config={this.state.configuration} onDataChange={this._setData} onViewportChange={this._updateViewport}
                              onSnackbarOpen={this._handleSnackbarOpen}/>
                <Snackbar open={this.state.snackbar.open} message={this.state.snackbar.message} autoHideDuration={8000}
                          onRequestClose={this._handleSnackbarClose} bodyStyle={snackbarBodyStyle}/>
            </div>
        );
    }
}

export default App;
