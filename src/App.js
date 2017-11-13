import React, { Component } from 'react';

import MapComponent from './map/component';
import SettingsComponent from './settings/component';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <SettingsComponent/>
                <MapComponent/>
            </div>
        );
    }
}
