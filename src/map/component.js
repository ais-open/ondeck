import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapGL from 'react-map-gl';
import bbox from 'geojson-bbox';
import * as _ from 'lodash';
import mapboxgl from 'mapbox-gl';

import { updateConfig } from '../state/actions/configActions';

import LayersComponent from './layers.component';
import './component.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm93bWFubWMiLCJhIjoieE9WenlhayJ9.QFS8jQtCusMhwwVSMQIg9w';
const colorScale = r => [r * 255, 140, 200 * (1 - r)];

class MapComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            viewport: props.config.viewport,
            hoveredFeature: null
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.config.dataUrl !== this.props.config.dataUrl && this.props.data) {
            this._centerMap();
        }
    }

    _centerMap() {
        if (this.props.data.features) {
            // collect bounds of map features
            let boundsArr = [];
            _.forEach(this.props.data.features, feature => {
                if (feature.geometry.type === 'Point') {
                    // use point lng/lat
                    boundsArr.push([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]);
                } else {
                    // determine extent of polygon, linestring, etc.
                    const extent = bbox(feature);
                    boundsArr.push([extent[0], extent[1]], [extent[2], extent[3]]);
                }
            });
            const bounds = new mapboxgl.LngLatBounds(boundsArr);

            // update viewport
            this._onViewportChange({
                longitude: bounds.getCenter().lng,
                latitude: bounds.getCenter().lat,
                zoom: this.state.viewport.zoom
            });
        }
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
            this.props.onViewportChange(this.state.viewport);
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
            _.forEach(this.props.settings.tooltipProps, (prop, idx) => {
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

    render() {
        return (
            <div>
                <MapGL
                    {...this.state.viewport}
                    mapStyle={this.props.config.baseMap}
                    dragRotate={true}
                    onViewportChange={this._onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}>
                    <LayersComponent viewport={this.state.viewport} colorScale={colorScale} onHover={this._onHover.bind(this)}/>
                </MapGL>
                {this._renderTooltip()}
            </div>
        );
    }
}

MapComponent.propTypes = {
    config: PropTypes.object,
    settings: PropTypes.object,
    data: PropTypes.object
};

const mapStateToProps = state => {
    return {
        config: state.config,
        settings: state.settings,
        data: state.data
    };
};

export default connect(mapStateToProps, {
    updateConfig
})(MapComponent);
