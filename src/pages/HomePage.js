import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts, ShortcutManager } from 'react-shortcuts';

import MapComponent from '../components/map';
import Keymap from './HomePageKeymap';


class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.shortcutManager = new ShortcutManager(Keymap);

        this.handleShortcuts = this.handleShortcuts.bind(this);
    }

    getChildContext() {
        return {
            shortcuts: this.shortcutManager
        };
    }

    componentWillMount() {
    }

    handleShortcuts(action, evt) {
        console.log('Got shortcut: ' + action);
    }

    render() {
        return (
            <Shortcuts name='SETTINGS' handler={this.handleShortcuts}>
                <MapComponent />
            </Shortcuts>
        );
    }
}

HomePage.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
}

export default HomePage;
