import React from 'react';
import PropTypes from 'prop-types';
import SettingsForm from './SettingsForm';


class SettingsPane extends React.Component {

    constructor(props) {
        super(props);
        
        this.cancel = this.cancel.bind(this);
    }

    cancel() {
        this.props.onClose();
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

                <SettingsForm onCancel={this.cancel} />
            </div>
        );
    }
}

SettingsPane.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default SettingsPane;
