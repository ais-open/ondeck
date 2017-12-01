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

class MapComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            viewport: props.config.viewport,
            hoveredFeature: null,
            featureProps: null
        };

        this._colorScale = this._colorScale.bind(this);
    }

    _colorScale(value) {
        const colorRange = this.props.config.colorRanges[this.props.settings.colorRange].value;
        if (typeof value === 'undefined' || value === null) {
            return colorRange[0];
        }
        let range = null;
        if (this.state.featureProps.length > colorRange.length) {
            range = Math.ceil(this.state.featureProps.length / colorRange.length);
        } else {
            range = 1;
        }
        const valueIdx = _.indexOf(this.state.featureProps, value);
        if (valueIdx < 0) {
            return colorRange[0];
        }
        return colorRange[Math.floor(valueIdx / range)] || colorRange[colorRange.length - 1];
    }

    _centerMap() {
        if (this.props.data.features) {
            // collect bounds of map features
            const features = _.sampleSize(this.props.data.features, 20);
            const boundsArr = [];
            _.forEach(features, feature => {
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

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.data, this.props.data) && !this.props.data.pending) {
            this._centerMap();
        }
        // update viewport if it's changed, but only if it's not equal to the default viewport (to prevent weird width/height issues)
        if (
            !_.isEqual(prevProps.config.viewport, this.props.config.viewport) &&
            !_.isEqual(this.props.config.viewport, this.props.defaultConfig.viewport)
        ) {
            this._onViewportChange(this.props.config.viewport);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.config.layer === 'geojson') {
            if (this.props.settings.fillProp !== nextProps.settings.fillProp) {
                this.setState({
                    featureProps: _.sortBy(_.uniq(_.map(nextProps.data.features, `properties.${nextProps.settings.fillProp}`)))
                });
            } else if (this.props.settings.lineProp !== nextProps.settings.lineProp) {
                this.setState({
                    featureProps: _.sortBy(_.uniq(_.map(nextProps.data.features, `properties.${nextProps.settings.lineProp}`)))
                });
            }
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
                    <LayersComponent viewport={this.state.viewport} colorScale={this._colorScale.bind(this)}
                                     onHover={this._onHover.bind(this)}/>
                </MapGL>
                {this._renderTooltip()}
            </div>
        );
    }
}

MapComponent.propTypes = {
    defaultConfig: PropTypes.object,
    config: PropTypes.object,
    settings: PropTypes.object,
    data: PropTypes.object
};

const mapStateToProps = state => {
    return {
        defaultConfig: state.defaultConfig,
        config: state.config,
        settings: state.settings,
        data: state.data
    };
};

export default connect(mapStateToProps, {
    updateConfig
})(MapComponent);
