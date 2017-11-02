import React, { Component } from 'react';
import * as _ from 'lodash';

import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ActionCached from 'material-ui/svg-icons/action/cached';
import ContentSave from 'material-ui/svg-icons/content/save';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import './component.css';

export default class SettingsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false,
            showHelp: false,
            dataUrl: this.props.config.dataUrl,
            currentConfig: Object.assign({}, this.props.config)
        };

        this._handleDrawerOpen = this._handleDrawerOpen.bind(this);
        this._handleDrawerClose = this._handleDrawerClose.bind(this);
        this._handleHelpOpen = this._handleHelpOpen.bind(this);
        this._handleHelpClose = this._handleHelpClose.bind(this);
        this._saveConfig = this._saveConfig.bind(this);
        this._resetConfig = this._resetConfig.bind(this);
        this._updateState = this._updateState.bind(this);
        this._handleDataSource = this._handleDataSource.bind(this);
        this._handleDataSourceUpdate = this._handleDataSourceUpdate.bind(this);
        this._handleDataSourceKeyDown = this._handleDataSourceKeyDown.bind(this);
        this._handleOverlay = this._handleOverlay.bind(this);
        this._handleBaseMap = this._handleBaseMap.bind(this);
        this._handleTooltipProps = this._handleTooltipProps.bind(this);
        this._handleElevationProp = this._handleElevationProp.bind(this);
        this._handleFillProp = this._handleFillProp.bind(this);
        this._handleLineProp = this._handleLineProp.bind(this);
        this._handleFilled = this._handleFilled.bind(this);
        this._handleStroked = this._handleStroked.bind(this);
        this._handleExtruded = this._handleExtruded.bind(this);
        this._handleWireframe = this._handleWireframe.bind(this);
        this._handleFP64 = this._handleFP64.bind(this);
        this._handleOpacity = this._handleOpacity.bind(this);
        this._handleMinPointRadius = this._handleMinPointRadius.bind(this);
        this._handlePointRadiusScale = this._handlePointRadiusScale.bind(this);
        this._handleMinLineWidth = this._handleMinLineWidth.bind(this);
    }

    _handleDrawerOpen() {
        this.setState({ drawerOpen: true });
    }

    _handleDrawerClose() {
        this.setState({ drawerOpen: false });
    }

    _handleHelpOpen() {
        this.setState({ showHelp: true });
    }

    _handleHelpClose() {
        this.setState({ showHelp: false });
    }

    _saveConfig() {
        this.props.onSave(this.state.currentConfig);
    }

    _resetConfig() {
        this.props.onReset();
    }

    _updateState(obj, newValue) {
        let newConfig = Object.assign({}, this.state.currentConfig);
        newConfig.overlaySettings[obj] = newValue;
        this.setState({
            currentConfig: newConfig
        }, () => {
            this.props.onChange(newConfig);
        });
    }

    _handleDataSource(event) {
        this.setState({
            dataUrl: event.target.value
        });
    }

    _handleDataSourceUpdate() {
        let newConfig = Object.assign({}, this.state.currentConfig);
        if (newConfig.dataUrl !== this.state.dataUrl) {
            newConfig.dataUrl = this.state.dataUrl;
            newConfig.overlaySettings.tooltipProps = [];
            newConfig.loadingData = true;
            this.setState({
                currentConfig: newConfig
            }, () => {
                this.props.onChange(newConfig);
            });
        }
    }

    _handleDataSourceKeyDown(event) {
        if (event.keyCode === 13) {
            this._handleDataSourceUpdate();
        }
    }

    _handleOverlay(event, index, value) {
        let newConfig = Object.assign({}, this.state.currentConfig);
        newConfig.overlay = value;
        newConfig.overlaySettings = _.clone(newConfig.overlays[value].settings);
        this.setState({
            currentConfig: newConfig
        }, () => {
            this.props.onChange(newConfig);
        });
    }

    _handleBaseMap(event, index, value) {
        let newConfig = Object.assign({}, this.state.currentConfig);
        newConfig.baseMap = value;
        this.setState({
            currentConfig: newConfig
        }, () => {
            this.props.onChange(newConfig);
        });
    }

    _handleTooltipProps(event, index, value) {
        this._updateState('tooltipProps', value);
    }

    _handleElevationProp(event, index, value) {
        this._updateState('elevationProp', value);
    }

    _handleFillProp(event, index, value) {
        this._updateState('fillProp', value);
    }

    _handleLineProp(event, index, value) {
        this._updateState('lineProp', value);
    }

    _handleFilled(event, isInputChecked) {
        this._updateState('filled', isInputChecked);
    }

    _handleStroked(event, isInputChecked) {
        this._updateState('stroked', isInputChecked);
    }

    _handleExtruded(event, isInputChecked) {
        this._updateState('extruded', isInputChecked);
    }

    _handleWireframe(event, isInputChecked) {
        this._updateState('wireframe', isInputChecked);
    }

    _handleFP64(event, isInputChecked) {
        this._updateState('fp64', isInputChecked);
    }

    _handleOpacity(event, value) {
        this._updateState('opacity', value);
    }

    _handleMinPointRadius(event, value) {
        this._updateState('pointRadiusMinPixels', value);
    }

    _handlePointRadiusScale(event, value) {
        this._updateState('pointRadiusScale', value);
    }

    _handleMinLineWidth(event, value) {
        this._updateState('lineWidthMinPixels', value);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.config, nextProps.config)) {
            this.setState({
                dataUrl: nextProps.config.dataUrl,
                currentConfig: nextProps.config
            });
        }
    }

    render() {
        const overlays = _.values(this.props.config.overlays);
        const overlayOptions = [];
        _.forEach(overlays, overlay => {
            overlayOptions.push(<MenuItem value={overlay.value} key={overlay.value} primaryText={overlay.label}/>);
        });
        const baseMaps = _.values(this.props.config.baseMaps);
        const baseMapOptions = [];
        _.forEach(baseMaps, baseMap => {
            baseMapOptions.push(<MenuItem value={baseMap.url} key={baseMap.url} primaryText={baseMap.name}/>);
        });
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
            <FlatButton label="Close" secondary={true} onClick={this._handleHelpClose}/>
        ];
        const refreshStatus = this.state.currentConfig.loadingData ? 'loading' : 'ready';

        return (
            <div className="settings">
                <FloatingActionButton mini className="settings__open-btn" onClick={this._handleDrawerOpen}>
                    <NavigationMenu/>
                </FloatingActionButton>
                <Drawer open={this.state.drawerOpen} width="25%">
                    <div className="settings__drawer">
                        <div className="settings__actions">
                            <div>
                                <FloatingActionButton mini secondary className="settings__close-btn" onClick={this._handleDrawerClose}>
                                    <NavigationChevronLeft/>
                                </FloatingActionButton>
                            </div>
                            <h1>OnDeck</h1>
                            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                      className="settings__menu">
                                <MenuItem leftIcon={<ContentSave/>} primaryText="Save" onClick={this._saveConfig}/>
                                <MenuItem leftIcon={<ActionCached/>} primaryText="Reset" onClick={this._resetConfig}/>
                                <Divider/>
                                <MenuItem leftIcon={<ActionHelp/>} primaryText="Help" onClick={this._handleHelpOpen}/>
                            </IconMenu>
                        </div>
                        <div className="settings__drawer-content">
                            <div className="settings__data-source">
                                <TextField floatingLabelText="Data Source" value={this.state.dataUrl} onChange={this._handleDataSource}
                                           className="settings__data-source-input" onKeyDown={this._handleDataSourceKeyDown}/>
                                <IconButton onClick={this._handleDataSourceUpdate} tooltip="Refresh Data Source" tooltipPosition="top-left"
                                            className="settings__data-source-refresh">
                                    <RefreshIndicator size={30} left={8} top={8} percentage={80} color="#2196f3" status={refreshStatus}/>
                                </IconButton>
                            </div>
                            <SelectField floatingLabelText="Base Map" floatingLabelFixed={true} hintText="Select..."
                                         className="settings__select" value={this.state.currentConfig.baseMap}
                                         onChange={this._handleBaseMap}>
                                {baseMapOptions}
                            </SelectField>
                            {/*<SelectField floatingLabelText="Overlay" floatingLabelFixed={true} hintText="Select..."*/}
                                         {/*className="settings__select" value={this.state.currentConfig.overlay}*/}
                                         {/*onChange={this._handleOverlay}>*/}
                                {/*{overlayOptions}*/}
                            {/*</SelectField>*/}
                            <SelectField floatingLabelText="Tooltip Properties" floatingLabelFixed={true} hintText="Select..."
                                         className="settings__select" value={this.state.currentConfig.overlaySettings.tooltipProps}
                                         onChange={this._handleTooltipProps} multiple={true}>
                                {_.drop(featurePropOptions)}
                            </SelectField>
                            <SelectField floatingLabelText="Elevation Property" floatingLabelFixed={true} hintText="Select..."
                                         className="settings__select" value={this.state.currentConfig.overlaySettings.elevationProp}
                                         onChange={this._handleElevationProp}>
                                {featurePropOptions}
                            </SelectField>
                            <SelectField floatingLabelText="Fill Color Property" floatingLabelFixed={true} hintText="Select..."
                                         className="settings__select" value={this.state.currentConfig.overlaySettings.fillProp}
                                         onChange={this._handleFillProp}>
                                {featurePropOptions}
                            </SelectField>
                            <SelectField floatingLabelText="Line Color Property" floatingLabelFixed={true} hintText="Select..."
                                         className="settings__select" value={this.state.currentConfig.overlaySettings.lineProp}
                                         onChange={this._handleLineProp}>
                                {featurePropOptions}
                            </SelectField>
                            <Toggle className="settings__toggle" label="Filled" toggled={this.state.currentConfig.overlaySettings.filled}
                                    onToggle={this._handleFilled}/>
                            <Toggle className="settings__toggle" label="Stroked" toggled={this.state.currentConfig.overlaySettings.stroked}
                                    onToggle={this._handleStroked}/>
                            <Toggle className="settings__toggle" label="Extruded" toggled={this.state.currentConfig.overlaySettings.extruded}
                                    onToggle={this._handleExtruded}/>
                            <Toggle className="settings__toggle" label="Wireframe" toggled={this.state.currentConfig.overlaySettings.wireframe}
                                    onToggle={this._handleWireframe}/>
                            <Toggle className="settings__toggle" label="FP64" toggled={this.state.currentConfig.overlaySettings.fp64}
                                    onToggle={this._handleFP64}/>
                            <div className="settings__slider">
                                <label>Opacity</label>
                                <Slider min={0} max={1} step={0.01} sliderStyle={sliderStyle}
                                        value={this.state.currentConfig.overlaySettings.opacity} onChange={this._handleOpacity}/>
                            </div>
                            <div className="settings__slider">
                                <label>Min Point Radius</label>
                                <Slider min={1} max={20} step={1} sliderStyle={sliderStyle}
                                        value={this.state.currentConfig.overlaySettings.pointRadiusMinPixels}
                                        onChange={this._handleMinPointRadius}/>
                            </div>
                            <div className="settings__slider">
                                <label>Point Radius Scale</label>
                                <Slider min={0} max={1000} step={1} sliderStyle={sliderStyle}
                                        value={this.state.currentConfig.overlaySettings.pointRadiusScale}
                                        onChange={this._handlePointRadiusScale}/>
                            </div>
                            <div className="settings__slider">
                                <label>Min Line Width</label>
                                <Slider min={1} max={20} step={1} sliderStyle={sliderStyle}
                                        value={this.state.currentConfig.overlaySettings.lineWidthMinPixels}
                                        onChange={this._handleMinLineWidth}/>
                            </div>
                        </div>
                    </div>
                </Drawer>
                <Dialog title={this.state.currentConfig.overlays[this.state.currentConfig.overlay].label + ' Settings'}
                        modal={false} open={this.state.showHelp} onRequestClose={this._handleHelpClose} actions={helpActions}
                        autoScrollBodyContent={true} className="settings__help">
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
