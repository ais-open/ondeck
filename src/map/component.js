import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import 'whatwg-fetch';
import * as _ from 'lodash';

import GeoJsonOverlay from './overlays/geojson';
import './component.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm93bWFubWMiLCJhIjoieE9WenlhayJ9.QFS8jQtCusMhwwVSMQIg9w';
const colorScale = r => [r * 255, 140, 200 * (1 - r)];

export default class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: props.config.viewport.width,
                height: props.config.viewport.height,
                longitude: props.config.viewport.longitude,
                latitude: props.config.viewport.latitude,
                zoom: props.config.viewport.zoom,
                pitch: props.config.viewport.pitch,
                bearing: props.config.viewport.bearing
            },
            data: null,
            currentConfig: Object.assign({}, this.props.config),
            hoveredFeature: null
        };

        this._fetchData();
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    componentDidUpdate(prevProps) {
        if (this.props.config.dataUrl !== prevProps.config.dataUrl) {
            this._fetchData();
        }
    }

    _fetchData() {
        fetch(this.props.config.dataUrl).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                data: data
            }, () => {
                this.props.onDataChange(data);
            });
        }).catch(error => {
            console.error('Error getting data from ' + this.props.config.dataUrl, error);
            this.setState({
                data: null
            });
            this.props.onSnackbarOpen(`Error fetching data from ${this.props.config.dataUrl}`, 'error');
        });
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport},
        }, () => {
            this.props.onViewportChange(viewport);
        });
    }

    _onHover({lngLat, x, y, object}) {
        this.setState({
            hoveredFeature: object, lngLat, x, y
        });
    }

    _renderTooltip() {
        const {lngLat, x, y, hoveredFeature} = this.state;
        const tooltipContent = [];
        if (hoveredFeature) {
            tooltipContent.push(
                <div key="lng">Lng: {lngLat[0].toFixed(3)}</div>,
                <div key="lat">Lat: {lngLat[1].toFixed(3)}</div>
            );
            _.forEach(this.state.currentConfig.overlaySettings.tooltipProps, (prop, idx) => {
                tooltipContent.push(<div key={idx}>{prop}: {hoveredFeature.properties[prop]}</div>);
            });
            return (
                <div className="tooltip" style={{top: y, left: x}}>
                    <div>
                        {tooltipContent}
                    </div>
                </div>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.config, nextProps.config)) {
            this.setState({
                currentConfig: nextProps.config
            });
        }
    }

    render() {
        const {data, viewport, currentConfig} = this.state;

        return (
            <div>
                <MapGL
                    {...viewport}
                    mapStyle={currentConfig.baseMap}
                    dragRotate={true}
                    onViewportChange={this._onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}>
                    <GeoJsonOverlay viewport={viewport}
                                    data={data}
                                    colorScale={colorScale}
                                    elevationProp={currentConfig.overlaySettings.elevationProp}
                                    fillProp={currentConfig.overlaySettings.fillProp}
                                    lineProp={currentConfig.overlaySettings.lineProp}
                                    opacity={currentConfig.overlaySettings.opacity}
                                    stroked={currentConfig.overlaySettings.stroked}
                                    filled={currentConfig.overlaySettings.filled}
                                    extruded={currentConfig.overlaySettings.extruded}
                                    wireframe={currentConfig.overlaySettings.wireframe}
                                    fp64={currentConfig.overlaySettings.fp64}
                                    pointRadiusMinPixels={currentConfig.overlaySettings.pointRadiusMinPixels}
                                    pointRadiusScale={currentConfig.overlaySettings.pointRadiusScale}
                                    lineWidthMinPixels={currentConfig.overlaySettings.lineWidthMinPixels}
                                    lightSettings={currentConfig.overlaySettings.lightSettings}
                                    onHover={this._onHover.bind(this)}/>
                </MapGL>
                {this._renderTooltip()}
            </div>
        );
    }
}
