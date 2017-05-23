import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts, ShortcutManager } from 'react-shortcuts';
import ReactModal from 'react-modal';

import MapComponent from '../components/map';
import SettingsForm from '../components/settings';
import Keymap from './HomePageKeymap';


class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: true
        };

        this.shortcutManager = new ShortcutManager(Keymap);

        this.setModalState = this.setModalState.bind(this);
    }

    getChildContext() {
        return {
            shortcuts: this.shortcutManager
        };
    }

    componentWillMount() {
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

    render() {
        return (
            <Shortcuts name='SETTINGS' handler={this.setModalState}>
                <MapComponent />
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
                    <SettingsForm onClose={this.setModalState} />
                </ReactModal>
            </Shortcuts>
        );
    }
}

HomePage.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

export default HomePage;
