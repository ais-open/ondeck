import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateConfig } from './state/actions/configActions';
import { updateSettings } from './state/actions/settingsActions';
import { updateData } from './state/actions/dataActions';

import StatefulApi from './api/StatefulApi';
import MapComponent from './map/component';
import SettingsComponent from './settings/component';


import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: null
        };

        this._handleViewport = this._handleViewport.bind(this);
    }

    _handleViewport(viewport) {
        this.setState({
            viewport: viewport
        });
    }

    componentDidMount() {
        if (this.props.config.stateful) {
            let statefulStatus = {
                value: false,
                error: null
            };

            const getStateId = () => {
                let query = window.location.search.substring(1);
                let vars = query.split('&');
                for (let i = 0; i < vars.length; i++) {
                    let pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]) === 'id') {
                        return decodeURIComponent(pair[1]);
                    }
                }
            };

            const stateId = getStateId();

            if (stateId) {
                StatefulApi.getState(`${this.props.config.stateful}/states/state/${stateId}`).then(result => {
                    let initialState = {};
                    try {
                        initialState = JSON.parse(result.user_state);
                        this.props.updateConfig(initialState.config);
                        this.props.updateSettings(initialState.settings);
                        this.props.updateData(initialState.data);
                    } catch (err) {
                        statefulStatus = {
                            value: true,
                            error: err.message
                        };
                    }
                }).catch((err) => {
                    statefulStatus = {
                        value: false,
                        error: err.message
                    };
                });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <SettingsComponent viewport={this.state.viewport}/>
                <MapComponent onViewportChange={this._handleViewport}/>
            </div>
        );
    }
}

MapComponent.propTypes = {
    config: PropTypes.object
};

const mapStateToProps = state => {
    return {
        config: state.config
    };
};

export default connect(mapStateToProps, {
    updateConfig,
    updateSettings,
    updateData
})(App);
