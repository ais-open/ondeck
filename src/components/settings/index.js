import React from 'react';
import PropTypes from 'prop-types';

import AisNumberInput from '../form/AisNumberInput';
import AisTextInput from '../form/AisTextInput';


class SettingsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: Object.assign({}, this.props.config)
        };

        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    closeModal() {
        this.props.onClose();
    }

    handleChange(evt) {
        let newConfig = this.state.current;
        let name = evt.target.name;
        let val = evt.target.value;

        // check for numeric types since we have a mix
        if (val && !isNaN(parseFloat(val))) {
            val = parseFloat(val);
        }

        if (name === 'geoColor') {
            console.log('val: ' + val);
            val = JSON.parse(val); // convert from string back to array
        }

        newConfig[evt.target.name] = val;
        this.setState({
            current: newConfig
        });
    }

    save(evt) {
        evt.preventDefault();
        this.props.onSave(this.state.current);
        this.closeModal();
    }

    render() {

        if (!this.state) {
            return null;
        }

        const config = this.state.current;

        return (
            <div className="SettingsForm">
                <h1>Settings Form</h1>
                <form>
                    <AisTextInput name="dataUrl"
                        label="Data URL"
                        value={config.dataUrl}
                        onChange={this.handleChange}
                        />

                    <AisTextInput name="geoColor"
                        label="Data Color [R, G, B]"
                        value={JSON.stringify(config.geoColor)}
                        onChange={this.handleChange}
                        />

                    <AisNumberInput name="pointRadius"
                        label="Point Radius"
                        value={config.pointRadius}
                        onChange={this.handleChange}
                        />

                    <AisNumberInput name="lineWidth"
                        label="Line Width"
                        value={config.lineWidth}
                        onChange={this.handleChange}
                        />

                    <AisNumberInput name="opacity"
                        label="Opacity (0 - 1)"
                        value={config.opacity}
                        step={0.1}
                        onChange={this.handleChange}
                        />

                    <AisNumberInput name="bearing"
                        label="Bearing (left/right)"
                        value={config.bearing}
                        onChange={this.handleChange}
                        />

                    <AisNumberInput name="pitch"
                        label="Pitch (up/down)"
                        value={config.pitch}
                        onChange={this.handleChange}
                        />

                    <div className="SettingsForm__actions">
                        <a onClick={this.closeModal}>Cancel</a>
                        <button onClick={this.save}>Save</button>
                    </div>
                </form>

            </div>
        );
    }
}

SettingsForm.propTypes = {
    config: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default SettingsForm;
