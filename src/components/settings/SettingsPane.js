import React from 'react';
import PropTypes from 'prop-types';
import SettingsForm from './SettingsForm';


class SettingsPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let className = "SettingsPane SettingsPane__closed";
        if (this.props.isOpen) {
            className = "SettingsPane SettingsPane__open";
        }
        return (
            <div className={className}>
                <div className="SettingsPane__close-btn" onClick={this.props.onClose}>
                    <i className="fa fa-close" />
                </div>

                <h1>On Deck</h1>

                <SettingsForm 
                    config={this.props.configuration}
                    onClose={this.props.onClose} 
                    onReset={this.props.onReset} 
                    onSave={this.props.onSave} />
            </div>
        );
    }
}

SettingsPane.propTypes = {
    configuration: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default SettingsPane;
