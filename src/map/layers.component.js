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

        this._generateLayer = this._generateLayer.bind(this);
    }

    _generateLayer(layerId, props) {
        if (props.config.layer === 'geojson') {
            return new GeoJsonLayer({
                id: layerId,
                data: props.data,
                opacity: props.settings.opacity,
                stroked: props.settings.stroked,
                filled: props.settings.filled,
                extruded: props.settings.extruded,
                wireframe: props.settings.wireframe,
                fp64: props.settings.fp64,
                pointRadiusMinPixels: props.settings.pointRadiusMinPixels,
                pointRadiusScale: props.settings.pointRadiusScale,
                lineWidthMinPixels: props.settings.lineWidthMinPixels,
                getElevation: f => Math.sqrt(f.properties[props.settings.elevationProp]) * 10,
                getFillColor: f => this.props.colorScale(f.properties[props.settings.fillProp]),
                getLineColor: f => this.props.colorScale(f.properties[props.settings.lineProp]),
                lightSettings: props.settings.lightSettings,
                pickable: true,
                onHover: props.onHover,
                updateTriggers: {
                    getElevation: props.settings.elevationProp,
                    getFillColor: props.settings.fillProp,
                    getLineColor: props.settings.lineProp
                }
            });
        } else if (props.config.layer === 'hexagon') {
            const pts = [];
            _.forEach(props.data.features, feature => {
                let coords = feature.geometry.coordinates;
                pts.push({position: coords});
            });
            return new HexagonLayer({
                id: `hexagon`,
                data: pts,
                colorRange: props.config.colorRanges[props.settings.colorRange].value,
                opacity: props.settings.opacity,
                extruded: props.settings.extruded,
                fp64: props.settings.fp64,
                radius: props.settings.radius,
                coverage: props.settings.coverage,
                lowerPercentile: props.settings.lowerPercentile,
                upperPercentile: props.settings.upperPercentile,
                elevationRange: [props.settings.lowerElevation, props.settings.upperElevation],
                elevationScale: 2,
                lightSettings: props.settings.lightSettings,
                pickable: true,
                onHover: props.onHover
            });
        }
    }

    componentDidMount() {
        this.setState({
            layer: this._generateLayer(this.props.config.layer, this.props)
        });
    }

    componentWillReceiveProps(nextProps) {
        if (
            !_.isEqual(this.props.data, nextProps.data) ||
            !_.isEqual(this.props.settings, nextProps.settings)
        ) {
            if (nextProps.data) {
                // update layerId when changing elevation due to a deck.gl bug where the getElevation updateTrigger is ignored
                // https://github.com/uber/deck.gl/issues/1065
                let layerId = this.props.settings.layer;
                if (this.props.settings.elevationProp !== nextProps.settings.elevationProp) {
                    layerId = nextProps.settings.elevationProp ?
                        `${layerId}${nextProps.settings.elevationProp}` :
                        layerId;
                }
                if (this.props.settings.colorRange !== nextProps.settings.colorRange) {
                    layerId = `${layerId}${nextProps.settings.colorRange}`;
                }
                this.setState({
                    layer: this._generateLayer(layerId, nextProps)
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
