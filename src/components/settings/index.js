import React from 'react';
import PropTypes from 'prop-types';

import AisTextInput from '../form/AisTextInput';


class SettingsForm extends React.Component {

    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    closeModal() {
        this.props.onClose();
    }

    handleChange() {
    }

    render() {

        return (
            <div className="SettingsForm">
                <h1>Settings Form</h1>
                <form>
                    <AisTextInput name="dataUrl"
                        label="Data URL"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="baseTiles"
                        label="Base Tiles"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="geoColor"
                        label="Data Color [R, G, B]"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="pointRadius"
                        label="Point Radius"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="lineWidth"
                        label="Line Width"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="opacity"
                        label="Opacity (0 - 1)"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="bearing"
                        label="Bearing (left/right)"
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="pitch"
                        label="Pitch (up/down)"
                        onChange={this.handleChange}
                        />
                </form>
                <button onClick={this.closeModal}>Save</button>
            </div>
        );
    }
}

SettingsForm.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default SettingsForm;
