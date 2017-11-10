import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import 'whatwg-fetch';
import * as _ from 'lodash';
import mapboxgl from 'mapbox-gl';

import LayersComponent from './layers.component';
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

    _findCenter() { // this runs as a web worker
        this.onmessage = (e) => {
            // determine base url and import necessary scripts
            if (!location.origin) { // eslint-disable-line
                location.origin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: ''); // eslint-disable-line
            }
            const scriptBaseUrl = e.data.url ? `${location.origin}/${e.data.url}` : location.origin; // eslint-disable-line
            importScripts(`${scriptBaseUrl}/scripts/geojson-bbox.min.js`); // eslint-disable-line

            // collect bounds of map features
            let bounds = [];
            e.data.features.forEach(feature => {
                if (feature.geometry.type === 'Point') {
                    // use point lng/lat
                    bounds.push(feature.geometry.coordinates);
                } else {
                    // determine extent of polygon, linestring, etc.
                    const extent = bbox(feature); // eslint-disable-line
                    bounds.push([extent[0], extent[1]], [extent[2], extent[3]]);
                }
            });
            // post message back to main script
            this.postMessage(bounds);
        }
    }

    _fetchData() {
        fetch(this.props.config.dataUrl).then(response => {
            return response.json();
        }).then(data => {
            // init web worker
            let code = this._findCenter.toString();
            code = code.substring(code.indexOf('{')+1, code.lastIndexOf('}'));

            const blob = new Blob([code], {type: 'application/javascript'});
            const worker = new Worker(URL.createObjectURL(blob));

            // handle web worker response
            worker.onmessage = (msg) => {
                const bounds = new mapboxgl.LngLatBounds(msg.data);

                // update viewport
                this._onViewportChange({
                    longitude: bounds.getCenter().lng,
                    latitude: bounds.getCenter().lat
                });

                // update data
                this.setState({
                    data: data
                }, () => {
                    this.props.onDataChange(data);
                });
            };

            // start web worker
            worker.postMessage({
                url: process.env.PUBLIC_URL,
                features: data.features
            });
        }).catch(error => {
            console.error('Error getting data from ' + this.props.config.dataUrl, error);
            // update data
            this.setState({
                data: null
            }, () => {
                this.props.onDataChange({});
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
            _.forEach(this.state.currentConfig.layerSettings.tooltipProps, (prop, idx) => {
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
                    <LayersComponent viewport={viewport} data={data} colorScale={colorScale} onHover={this._onHover.bind(this)}
                                     layer={currentConfig.layer} settings={currentConfig.layerSettings}/>
                </MapGL>
                {this._renderTooltip()}
            </div>
        );
    }
}
