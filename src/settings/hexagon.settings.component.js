import React, {Component} from 'react';
import * as _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';

export default class HexagonSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentConfig: Object.assign({}, this.props.config)
        };
    }

    render() {
        const colorRangeOptions = [];
        _.forEach(_.keys(this.state.currentConfig.colorRanges), colorRange => {
            colorRangeOptions.push(
                <MenuItem value={this.state.currentConfig.colorRanges[colorRange]} key={colorRange} primaryText={colorRange}/>
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
                             className="settings__select" value={this.state.currentConfig.colorRange}
                             onChange={(event, index, value) => {
                                 this.props.onChange('tooltipProps', value);
                             }}>
                    {colorRangeOptions}
                </SelectField>
                <Toggle className="settings__toggle" label="FP64" toggled={this.state.currentConfig.layerSettings.fp64}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('fp64', isInputChecked);
                        }}/>
                <Toggle className="settings__toggle" label="Extruded" toggled={this.state.currentConfig.layerSettings.extruded}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('extruded', isInputChecked);
                        }}/>
                <div className="settings__slider">
                    <label>Opacity</label>
                    <Slider min={0} max={1} step={0.01} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.opacity}
                            onChange={(event, value) => {
                                this.props.onChange('opacity', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Radius</label>
                    <Slider min={10} max={10000} step={10} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.radius}
                            onChange={(event, value) => {
                                this.props.onChange('radius', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Coverage</label>
                    <Slider min={0} max={1} step={0.1} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.coverage}
                            onChange={(event, value) => {
                                this.props.onChange('coverage', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Lower Percentile</label>
                    <Slider min={0} max={100} step={1} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.lowerPercentile}
                            onChange={(event, value) => {
                                this.props.onChange('lowerPercentile', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Upper Percentile</label>
                    <Slider min={0} max={100} step={1} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.upperPercentile}
                            onChange={(event, value) => {
                                this.props.onChange('upperPercentile', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Lower Elevation</label>
                    <Slider min={0} max={100000} step={1000} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.lowerElevation}
                            onChange={(event, value) => {
                                this.props.onChange('lowerElevation', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Upper Elevation</label>
                    <Slider min={0} max={100000} step={1000} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.upperElevation}
                            onChange={(event, value) => {
                                this.props.onChange('upperElevation', value);
                            }}/>
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
