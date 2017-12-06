import React, { Component } from 'react';

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

    render() {
        return (
            <div className="App">
                <SettingsComponent viewport={this.state.viewport}/>
                <MapComponent onViewportChange={this._handleViewport}/>
            </div>
        );
    }
}

export default App;
