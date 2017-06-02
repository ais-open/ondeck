import React from 'react';
//import PropTypes from 'prop-types';
import SettingsForm from './SettingsForm';


class SettingsPane extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        if (!this.state) {
            return null;
        }

        const config = this.state.current;

        return (
            <div className="SettingsPane">
                <div className="SettingsPane__close" onClick={this.closePane}>
                    <i className="fa fa-close" />
                </div>

                <h1>On Deck</h1>

                <SettingsForm />
            </div>
        );
    }
}

export default SettingsPane;
