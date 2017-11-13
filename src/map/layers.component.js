import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeckGL, {GeoJsonLayer, HexagonLayer} from 'deck.gl';
import * as _ from 'lodash';

class LayersComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            layer: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            !_.isEqual(this.props.data, nextProps.data) ||
            this.props.config.layer !== nextProps.config.layer ||
            !_.isEqual(this.props.layer, nextProps.layer)
        ) {
            let layerObj = null;
            // update layerId when changing elevation due to a deck.gl bug where the getElevation updateTrigger is ignored
            // https://github.com/uber/deck.gl/issues/1065
            let layerId = 'geojson';
            if (this.props.layer.elevationProp !== nextProps.layer.elevationProp) {
                layerId = nextProps.layer.elevationProp ?
                    `geojson${nextProps.layer.elevationProp}` :
                    'geojson';
            }
            if (nextProps.config.layer === 'geojson') {
                layerObj = new GeoJsonLayer({
                    id: layerId,
                    data: nextProps.data,
                    opacity: nextProps.layer.opacity,
                    stroked: nextProps.layer.stroked,
                    filled: nextProps.layer.filled,
                    extruded: nextProps.layer.extruded,
                    wireframe: nextProps.layer.wireframe,
                    fp64: nextProps.layer.fp64,
                    pointRadiusMinPixels: nextProps.layer.pointRadiusMinPixels,
                    pointRadiusScale: nextProps.layer.pointRadiusScale,
                    lineWidthMinPixels: nextProps.layer.lineWidthMinPixels,
                    getElevation: f => Math.sqrt(f.properties[nextProps.layer.elevationProp]) * 10,
                    getFillColor: f => nextProps.colorScale(f.properties[nextProps.layer.fillProp]),
                    getLineColor: f => nextProps.colorScale(f.properties[nextProps.layer.lineProp]),
                    lightSettings: nextProps.layer.lightSettings,
                    pickable: true,
                    onHover: nextProps.onHover,
                    updateTriggers: {
                        getElevation: nextProps.layer.elevationProp,
                        getFillColor: nextProps.layer.fillProp,
                        getLineColor: nextProps.layer.lineProp
                    }
                });
            } else if (nextProps.config.layer === 'hexagon') {
                const pts = [];
                nextProps.data.features.forEach(feature => {
                    let coords = feature.geometry.coordinates;
                    pts.push({position: coords});
                });
                layerObj = new HexagonLayer({
                    id: `hexagon`,
                    data: pts,
                    opacity: nextProps.config.Settings.opacity,
                    extruded: nextProps.config.Settings.extruded,
                    fp64: nextProps.config.Settings.fp64,
                    radius: nextProps.config.Settings.radius,
                    coverage: nextProps.config.Settings.coverage,
                    lowerPercentile: nextProps.config.Settings.lowerPercentile,
                    upperPercentile: nextProps.config.Settings.upperPercentile,
                    elevationRange: [nextProps.config.Settings.lowerElevation, nextProps.config.Settings.upperElevation],
                    lightSettings: nextProps.config.Settings.lightSettings
                });
            }

            this.setState({
                layer: layerObj
            });
        }
    }

    render() {
        if (!this.props.data) {
            return null;
        }

        return (
            <DeckGL {...this.props.viewport} layers={[this.state.layer]} initWebGLParameters />
        );
    }
}

LayersComponent.propTypes = {
    config: PropTypes.object,
    layer: PropTypes.object,
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
    // actions here
})(LayersComponent);
