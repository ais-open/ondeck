import React from 'react';
import PropTypes from 'prop-types';

import AisDropdownList from '../form/AisDropdownList';
import AisSlider from '../form/AisSlider';
import AisTextInput from '../form/AisTextInput';


class SettingsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: Object.assign({}, this.props.config)
        };

        this.handleChange = this.handleChange.bind(this);
        this.postToStateful = this.postToStateful.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
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
        }, () => {
            this.props.onChange(newConfig);
        });
    }

    save(evt) {
        evt.preventDefault();
        this.props.onSave(this.state.current);
        this.props.onClose();
    }

    cancel() {
        this.props.onCancel();
        this.props.onClose();
    }

    reset() {
        this.props.onReset();
        this.props.onClose();
    }

    postToStateful() {
        if (!APP_CONFIG.stateful) {
            return;
        }
        const config = this.state.current;
        const statefulUrl = `${APP_CONFIG.stateful}/states`;
        let params = {
            'app_name': 'ondeck',
            'user_state': JSON.stringify(config)
        };

        fetch(statefulUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(params)
        }).then(response => {
            return response.json();
        }).then(data => {
            const stateId = data.id;
            window.history.pushState("", "OnDeck", `/?state=${stateId}`);
        });
    }

    render() {

        if (!this.state) {
            return null;
        }

        const config = this.state.current;
        const colorRanges = Object.keys(APP_CONFIG.availableColorRanges);

        let shareLink = null;
        if (APP_CONFIG.stateful) {
            shareLink = (
                <div className="SettingsForm__share">
                    <a onClick={this.postToStateful}>Generate Share Link</a>
                </div>
            );
        }


        return (
            <div className="SettingsForm">
                <form>
                    <AisTextInput name="dataUrl"
                        label="Data URL"
                        value={config.dataUrl}
                        onChange={this.handleChange}
                        />

                    <AisDropdownList name="baseMap"
                        label="Base Map"
                        valueField="url"
                        displayField="name"
                        value={config.baseMap}
                        options={APP_CONFIG.availableBaseMaps}
                        onChange={this.handleChange}
                        />

                    <AisDropdownList name="colorRange"
                        label="Color Range"
                        value={config.colorRange}
                        options={colorRanges}
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
                        max={60}
                        step={1}
                        value={config.pitch}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="radius"
                        label="Radius (meters)"
                        min={10}
                        max={10000}
                        step={10}
                        value={config.radius}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="coverage"
                        label="Coverage"
                        min={0}
                        max={1}
                        step={0.1}
                        value={config.coverage}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="lowerPercentile"
                        label="Lower Percentile"
                        min={0}
                        max={100}
                        step={1}
                        value={config.lowerPercentile}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="upperPercentile"
                        label="Upper Percentile"
                        min={0}
                        max={100}
                        step={1}
                        value={config.upperPercentile}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="lowerElevation"
                        label="Lower Elevation"
                        min={0}
                        max={100000}
                        step={1000}
                        value={config.lowerElevation}
                        onChange={this.handleChange}
                        />

                    <AisSlider name="upperElevation"
                        label="Upper Elevation"
                        min={0}
                        max={100000}
                        step={1000}
                        value={config.upperElevation}
                        onChange={this.handleChange}
                        />

                    <div className="SettingsForm__actions">
                        <a onClick={this.cancel}>Cancel</a>
                        <a onClick={this.reset}>Reset</a>
                        <button onClick={this.save}>Save</button>
                    </div>
                    { shareLink }
                </form>

            </div>
        );
    }
}

SettingsForm.propTypes = {
    config: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default SettingsForm;
