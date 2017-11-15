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
            !_.isEqual(this.props.settings, nextProps.settings)
        ) {
            if (nextProps.data) {
                let layerObj = null;
                // update layerId when changing elevation due to a deck.gl bug where the getElevation updateTrigger is ignored
                // https://github.com/uber/deck.gl/issues/1065
                let layerId = 'geojson';
                if (this.props.settings.elevationProp !== nextProps.settings.elevationProp) {
                    layerId = nextProps.settings.elevationProp ?
                        `geojson${nextProps.settings.elevationProp}` :
                        'geojson';
                }
                if (this.props.settings.colorRange !== nextProps.settings.colorRange) {
                    layerId = `${layerId}${nextProps.settings.colorRange}`;
                }
                if (nextProps.config.layer === 'geojson') {
                    layerObj = new GeoJsonLayer({
                        id: layerId,
                        data: nextProps.data,
                        opacity: nextProps.settings.opacity,
                        stroked: nextProps.settings.stroked,
                        filled: nextProps.settings.filled,
                        extruded: nextProps.settings.extruded,
                        wireframe: nextProps.settings.wireframe,
                        fp64: nextProps.settings.fp64,
                        pointRadiusMinPixels: nextProps.settings.pointRadiusMinPixels,
                        pointRadiusScale: nextProps.settings.pointRadiusScale,
                        lineWidthMinPixels: nextProps.settings.lineWidthMinPixels,
                        getElevation: f => Math.sqrt(f.properties[nextProps.settings.elevationProp]) * 10,
                        getFillColor: f => nextProps.colorScale(f.properties[nextProps.settings.fillProp]),
                        getLineColor: f => nextProps.colorScale(f.properties[nextProps.settings.lineProp]),
                        lightSettings: nextProps.settings.lightSettings,
                        pickable: true,
                        onHover: nextProps.onHover,
                        updateTriggers: {
                            getElevation: nextProps.settings.elevationProp,
                            getFillColor: nextProps.settings.fillProp,
                            getLineColor: nextProps.settings.lineProp
                        }
                    });
                } else if (nextProps.config.layer === 'hexagon') {
                    const pts = [];
                    _.forEach(nextProps.data.features, feature => {
                        let coords = feature.geometry.coordinates;
                        pts.push({position: coords});
                    });
                    layerObj = new HexagonLayer({
                        id: `hexagon`,
                        data: pts,
                        colorRange: nextProps.config.colorRanges[nextProps.settings.colorRange].value,
                        opacity: nextProps.settings.opacity,
                        extruded: nextProps.settings.extruded,
                        fp64: nextProps.settings.fp64,
                        radius: nextProps.settings.radius,
                        coverage: nextProps.settings.coverage,
                        lowerPercentile: nextProps.settings.lowerPercentile,
                        upperPercentile: nextProps.settings.upperPercentile,
                        elevationRange: [nextProps.settings.lowerElevation, nextProps.settings.upperElevation],
                        elevationScale: 2,
                        lightSettings: nextProps.settings.lightSettings,
                        pickable: true,
                        onHover: nextProps.onHover
                    });
                }

                this.setState({
                    layer: layerObj
                });
            }
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
    // actions here
})(LayersComponent);
