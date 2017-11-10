import React, {Component} from 'react';
import * as _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';

export default class GeoJsonSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentConfig: Object.assign({}, this.props.config)
        };
    }

    render() {
        const featurePropOptions = [
            <MenuItem value={null} key="none" primaryText=""/>
        ];
        if (this.props.data.features && this.props.data.features.length > 0) {
            const featureProps = _.keys(this.props.data.features[0].properties);
            _.forEach(featureProps, prop => {
                featurePropOptions.push(<MenuItem value={prop} key={prop} primaryText={prop}/>);
            });
        }
        const sliderStyle = {
            marginTop: 0,
            marginBottom: 0
        };
        const helpActions = [
            <FlatButton label="Close" secondary={true} onClick={this.props.onCloseHelp}/>
        ];

        return(
            <div>
                <h3>GeoJson Settings</h3>
                <SelectField floatingLabelText="Tooltip Properties" floatingLabelFixed={true} hintText="Select..."
                             className="settings__select" value={this.state.currentConfig.layerSettings.tooltipProps}
                             multiple={true} onChange={(event, index, value) => {
                                 this.props.onChange('tooltipProps', value);
                             }}>
                    {_.drop(featurePropOptions)}
                </SelectField>
                <SelectField floatingLabelText="Elevation Property" floatingLabelFixed={true} hintText="Select..."
                             className="settings__select" value={this.state.currentConfig.layerSettings.elevationProp}
                             onChange={(event, index, value) => {
                                 this.props.onChange('elevationProp', value);
                             }}>
                    {featurePropOptions}
                </SelectField>
                <SelectField floatingLabelText="Fill Color Property" floatingLabelFixed={true} hintText="Select..."
                             className="settings__select" value={this.state.currentConfig.layerSettings.fillProp}
                             onChange={(event, index, value) => {
                                 this.props.onChange('fillProp', value);
                             }}>
                    {featurePropOptions}
                </SelectField>
                <SelectField floatingLabelText="Line Color Property" floatingLabelFixed={true} hintText="Select..."
                             className="settings__select" value={this.state.currentConfig.layerSettings.lineProp}
                             onChange={(event, index, value) => {
                                 this.props.onChange('lineProp', value);
                             }}>
                    {featurePropOptions}
                </SelectField>
                <Toggle className="settings__toggle" label="FP64" toggled={this.state.currentConfig.layerSettings.fp64}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('fp64', isInputChecked);
                        }}/>
                <Toggle className="settings__toggle" label="Filled" toggled={this.state.currentConfig.layerSettings.filled}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('filled', isInputChecked);
                        }}/>
                <Toggle className="settings__toggle" label="Stroked" toggled={this.state.currentConfig.layerSettings.stroked}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('stroked', isInputChecked);
                        }}/>
                <Toggle className="settings__toggle" label="Extruded" toggled={this.state.currentConfig.layerSettings.extruded}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('extruded', isInputChecked);
                        }}/>
                <Toggle className="settings__toggle" label="Wireframe" toggled={this.state.currentConfig.layerSettings.wireframe}
                        onToggle={(event, isInputChecked) => {
                            this.props.onChange('wireframe', isInputChecked);
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
                    <label>Min Point Radius</label>
                    <Slider min={1} max={20} step={1} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.pointRadiusMinPixels}
                            onChange={(event, value) => {
                                this.props.onChange('pointRadiusMinPixels', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Point Radius Scale</label>
                    <Slider min={0} max={1000} step={1} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.pointRadiusScale}
                            onChange={(event, value) => {
                                this.props.onChange('pointRadiusScale', value);
                            }}/>
                </div>
                <div className="settings__slider">
                    <label>Min Line Width</label>
                    <Slider min={1} max={20} step={1} sliderStyle={sliderStyle}
                            value={this.state.currentConfig.layerSettings.lineWidthMinPixels}
                            onChange={(event, value) => {
                                this.props.onChange('lineWidthMinPixels', value);
                            }}/>
                </div>
                <Dialog title='GeoJson Settings' modal={false} open={this.props.showHelp} onRequestClose={this.props.onCloseHelp}
                        actions={helpActions} autoScrollBodyContent={true} className="settings__help">
                    <dl>
                        <dt>Tooltip Properties</dt>
                        <dd>The properties (in addition to longitude and latitude) that will show in the tooltip when hovering over a
                            feature.</dd>
                        <dt>Elevation Property</dt>
                        <dd>The property that controls the elevation of a polygon feature (when extruded is true).</dd>
                        <dt>Fill Color Property</dt>
                        <dd>The property that controls the solid color of polygon and point features.</dd>
                        <dt>Line Color Property</dt>
                        <dd>The property that controls the color of a line and/or the outline of polygon.</dd>
                        <dt>Filled</dt>
                        <dd>Whether to draw filled polygons (solid fill). Note that for each polygon, only the area between the outer
                            polygon and any holes will be filled. This setting is effective only when the polygon is NOT extruded.</dd>
                        <dt>Stroked</dt>
                        <dd>Whether to draw an outline around polygons (solid fill). Note that for complex polygons, both the outer
                            polygon as well the outlines of any holes will be drawn.</dd>
                        <dt>Extruded</dt>
                        <dd>Extrude Polygon and MultiPolygon features along the z-axis if set to true.</dd>
                        <dt>Wireframe</dt>
                        <dd>Whether to generate a line wireframe of the hexagon. The outline will have "horizontal" lines closing the top
                            and bottom polygons and a vertical line (a "strut") for each vertex on the polygon.</dd>
                        <dt>FP64</dt>
                        <dd>Whether the layer should be rendered in high-precision 64-bit mode</dd>
                        <dt>Minimum Point Radius</dt>
                        <dd>The minimum radius in pixels.</dd>
                        <dt>Point Radius Scale</dt>
                        <dd>A global radius multiplier for all points.</dd>
                        <dt>Minimum Line Width</dt>
                        <dd>The minimum line width in pixels.</dd>
                    </dl>
                </Dialog>
            </div>
        );
    }
}
