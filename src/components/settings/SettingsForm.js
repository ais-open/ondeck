import React from 'react';
import PropTypes from 'prop-types';

import AisDropdownList from '../form/AisDropdownList';
import AisNumberInput from '../form/AisNumberInput';
import AisSlider from '../form/AisSlider';
import AisTextInput from '../form/AisTextInput';


class SettingsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: Object.assign({}, this.props.config)
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
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
            val = JSON.parse(val); // convert from string back to array
        }

        newConfig[name] = val;
        //console.log(`Updating ${name} to ${val}`);
        this.setState({
            current: newConfig
        });
    }

    save(evt) {
        evt.preventDefault();
        this.props.onSave(this.state.current);
        this.props.onClose();
    }

    reset() {
        this.props.onReset();
        this.props.onClose();
    }

    render() {

        if (!this.state) {
            return null;
        }

        const config = this.state.current;
        const colorRanges = Object.keys(APP_CONFIG.availableColorRanges);

        return (
            <div className="SettingsForm">
                <form>
                    <AisTextInput name="dataUrl"
                        label="Data URL"
                        value={config.dataUrl}
                        onChange={this.handleChange}
                        />

                    <AisDropdownList name="baseTiles"
                        label="Base Map"
                        valueField="url"
                        displayField="name"
                        value={config.baseTiles}
                        options={APP_CONFIG.availableBaseMaps}
                        onChange={this.handleChange}
                        />

                    <AisDropdownList name="colorRange"
                        label="Color Range"
                        value={config.colorRange}
                        options={colorRanges}
                        onChange={this.handleChange}
                        />

                    <AisNumberInput name="radius"
                        label="Point Radius"
                        value={config.radius}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="bearing"
                        label="Bearing (left/right)"
                        min={0}
                        max={360}
                        step={1}
                        value={config.bearing}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="pitch"
                        label="Pitch (up/down)"
                        min={0}
                        max={89}
                        step={1}
                        value={config.pitch}
                        onChange={this.handleChange}
                        />

                    <div className="SettingsForm__actions">
                        <a onClick={this.props.onClose}>Cancel</a>
                        <a onClick={this.reset}>Reset</a>
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
    onReset: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default SettingsForm;

// GeoJSON Attributes
/*
<AisTextInput name="geoColor"
    label="Data Color [R, G, B, A]"
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
    */
