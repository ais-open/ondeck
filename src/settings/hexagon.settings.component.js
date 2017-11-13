import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';

import { updateLayerSettings } from '../state/actions/layerActions';

class HexagonSettings extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleOnChange = this._handleOnChange.bind(this);
    }

    _handleOnChange(key, value) {
        let newSettings = Object.assign({}, this.props.layer);
        newSettings[key] = value;
        this.props.updateLayerSettings(newSettings);
    }

    render() {
        if (this.props.data) {
            const colorRangeOptions = [];
            _.forEach(_.keys(this.props.config.colorRanges), colorRange => {
                colorRangeOptions.push(
                    <MenuItem value={colorRange} key={colorRange} primaryText={colorRange}/>
                );
            });
            const sliderStyle = {
                marginTop: 0,
                marginBottom: 0
            };
            const helpActions = [
                <FlatButton label="Close" secondary={true} onClick={this.props.onCloseHelp}/>
            ];

            return(
                <div>
                    <h3>Hexagon Settings</h3>
                    <SelectField floatingLabelText="Color Range" floatingLabelFixed={true} hintText="Select..."
                                 className="settings__select" value={this.props.layer.colorRange}
                                 onChange={(event, index, value) => {
                                     this._handleOnChange('tooltipProps', value);
                                 }}>
                        {colorRangeOptions}
                    </SelectField>
                    <Toggle className="settings__toggle" label="FP64" toggled={this.props.layer.fp64}
                            onToggle={(event, isInputChecked) => {
                                this._handleOnChange('fp64', isInputChecked);
                            }}/>
                    <Toggle className="settings__toggle" label="Extruded" toggled={this.props.layer.extruded}
                            onToggle={(event, isInputChecked) => {
                                this._handleOnChange('extruded', isInputChecked);
                            }}/>
                    <div className="settings__slider">
                        <label>Opacity</label>
                        <Slider min={0} max={1} step={0.01} sliderStyle={sliderStyle}
                                value={this.props.layer.opacity}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('opacity', value);
                                }, 250)}/>
                    </div>
                    <div className="settings__slider">
                        <label>Radius</label>
                        <Slider min={10} max={10000} step={10} sliderStyle={sliderStyle}
                                value={this.props.layer.radius}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('radius', value);
                                }, 250)}/>
                    </div>
                    <div className="settings__slider">
                        <label>Coverage</label>
                        <Slider min={0} max={1} step={0.1} sliderStyle={sliderStyle}
                                value={this.props.layer.coverage}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('coverage', value);
                                }, 250)}/>
                    </div>
                    <div className="settings__slider">
                        <label>Lower Percentile</label>
                        <Slider min={0} max={100} step={1} sliderStyle={sliderStyle}
                                value={this.props.layer.lowerPercentile}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('lowerPercentile', value);
                                }, 250)}/>
                    </div>
                    <div className="settings__slider">
                        <label>Upper Percentile</label>
                        <Slider min={0} max={100} step={1} sliderStyle={sliderStyle}
                                value={this.props.layer.upperPercentile}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('upperPercentile', value);
                                }, 250)}/>
                    </div>
                    <div className="settings__slider">
                        <label>Lower Elevation</label>
                        <Slider min={0} max={100000} step={1000} sliderStyle={sliderStyle}
                                value={this.props.layer.lowerElevation}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('lowerElevation', value);
                                }, 250)}/>
                    </div>
                    <div className="settings__slider">
                        <label>Upper Elevation</label>
                        <Slider min={0} max={100000} step={1000} sliderStyle={sliderStyle}
                                value={this.props.layer.upperElevation}
                                onChange={_.debounce((event, value) => {
                                    this._handleOnChange('upperElevation', value);
                                }, 250)}/>
                    </div>
                    <Dialog title='Hexagon Settings' modal={false} open={this.props.showHelp} onRequestClose={this.props.onCloseHelp}
                            actions={helpActions} autoScrollBodyContent={true} className="settings__help">
                        <dl>
                            <dt>FP64</dt>
                            <dd>Whether the layer should be rendered in high-precision 64-bit mode</dd>
                            <dt>Extruded</dt>
                            <dd>Whether to enable cell elevation. Cell elevation scale by count of points in each cell. If set to false, all
                                cells will be flat.</dd>
                            <dt>Radius</dt>
                            <dd>Radius of hexagon bin in meters.</dd>
                            <dt>Coverage</dt>
                            <dd>Hexagon radius multiplier. The final radius of hexagon is calculated by coverage *
                                radius. Note: coverage does not affect how points are binned. The radius of the bin is determined only by the
                                radius property.</dd>
                            <dt>Lower/Upper Percentile</dt>
                            <dd>Filter bins and re-calculate color by percentile value. Hexagons with value larger than the upperPercentile
                                will be hidden, along with hexagons with value smaller than the lowerPercentile.</dd>
                        </dl>
                    </Dialog>
                </div>
            );
        }
    }
}

HexagonSettings.propTypes = {
    config: PropTypes.object,
    layerSettings: PropTypes.object,
    data: PropTypes.object
};

const mapStateToProps = state => {
    return {
        config: state.config,
        layer: state.layer,
        data: state.data
    };
};

export default connect(mapStateToProps, {
    updateLayerSettings
})(HexagonSettings);
