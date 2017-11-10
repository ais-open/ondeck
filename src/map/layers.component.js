import React, {Component} from 'react';
import DeckGL, {GeoJsonLayer, HexagonLayer} from 'deck.gl';
import * as _ from 'lodash';

export default class LayersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            layer: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const {data, colorScale, onHover, layer, settings} = nextProps;

        if (!_.isEqual(this.props.data, data) || this.props.layer !== layer || !_.isEqual(this.props.settings, settings)) {
            let layerObj = null;
            // update layerId when changing elevation due to a deck.gl bug where the getElevation updateTrigger is ignored
            // https://github.com/uber/deck.gl/issues/1065
            let layerId = 'geojson';
            if (this.props.settings.elevationProp !== settings.elevationProp) {
                layerId = settings.elevationProp ? `geojson${settings.elevationProp}` : 'geojson';
            }
            if (layer === 'geojson') {
                layerObj = new GeoJsonLayer({
                    id: layerId,
                    data: data,
                    opacity: settings.opacity,
                    stroked: settings.stroked,
                    filled: settings.filled,
                    extruded: settings.extruded,
                    wireframe: settings.wireframe,
                    fp64: settings.fp64,
                    pointRadiusMinPixels: settings.pointRadiusMinPixels,
                    pointRadiusScale: settings.pointRadiusScale,
                    lineWidthMinPixels: settings.lineWidthMinPixels,
                    getElevation: f => Math.sqrt(f.properties[settings.elevationProp]) * 10,
                    getFillColor: f => colorScale(f.properties[settings.fillProp]),
                    getLineColor: f => colorScale(f.properties[settings.lineProp]),
                    lightSettings: settings.lightSettings,
                    pickable: true,
                    onHover: onHover,
                    updateTriggers: {
                        getElevation: settings.elevationProp,
                        getFillColor: settings.fillProp,
                        getLineColor: settings.lineProp
                    }
                });
            } else if (layer === 'hexagon') {
                const pts = [];
                data.features.forEach(feature => {
                    let coords = feature.geometry.coordinates;
                    pts.push({position: coords});
                });
                layerObj = new HexagonLayer({
                    id: `hexagon`,
                    data: pts,
                    opacity: settings.opacity,
                    extruded: settings.extruded,
                    fp64: settings.fp64,
                    radius: settings.radius,
                    coverage: settings.coverage,
                    lowerPercentile: settings.lowerPercentile,
                    upperPercentile: settings.upperPercentile,
                    elevationRange: [settings.lowerElevation, settings.upperElevation],
                    lightSettings: settings.lightSettings
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
