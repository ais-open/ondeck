import React, {Component} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import * as _ from 'lodash';

export default class GeoJsonOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            layer: null,
            layerId: 'geojson'
        };
    }

    componentWillReceiveProps(nextProps) {
        // only update layer if a relevant prop has changed (ignore bearing, pitch, and zoom changes)
        if (
            !_.isEqual(this.props.data, nextProps.data) ||
            this.props.opacity !== nextProps.opacity ||
            this.props.stroked !== nextProps.stroked ||
            this.props.filled !== nextProps.filled ||
            this.props.extruded !== nextProps.extruded ||
            this.props.wireframe !== nextProps.wireframe ||
            this.props.fp64 !== nextProps.fp64 ||
            this.props.pointRadiusMinPixels !== nextProps.pointRadiusMinPixels ||
            this.props.pointRadiusScale !== nextProps.pointRadiusScale ||
            this.props.lineWidthMinPixels !== nextProps.lineWidthMinPixels ||
            this.props.elevationProp !== nextProps.elevationProp ||
            this.props.fillProp !== nextProps.fillProp ||
            this.props.lineProp !== nextProps.lineProp
        ) {
            // if elevation, fill color, or line color prop was changed, update id to re-render layer
            let layerId = this.state.layerId;
            if (
                this.props.elevationProp !== nextProps.elevationProp ||
                this.props.fillProp !== nextProps.fillProp ||
                this.props.lineProp !== nextProps.lineProp
            ) {
                layerId = `geojson${new Date().toISOString()}`;
            }
            const layer = new GeoJsonLayer({
                id: layerId,
                data: nextProps.data,
                opacity: nextProps.opacity,
                stroked: nextProps.stroked,
                filled: nextProps.filled,
                extruded: nextProps.extruded,
                wireframe: nextProps.wireframe,
                fp64: nextProps.fp64,
                pointRadiusMinPixels: nextProps.pointRadiusMinPixels,
                pointRadiusScale: nextProps.pointRadiusScale,
                lineWidthMinPixels: nextProps.lineWidthMinPixels,
                getElevation: f => Math.sqrt(f.properties[nextProps.elevationProp]) * 10,
                getFillColor: f => nextProps.colorScale(f.properties[nextProps.fillProp]),
                getLineColor: f => nextProps.colorScale(f.properties[nextProps.lineProp]),
                lightSettings: nextProps.lightSettings,
                pickable: true,
                onHover: nextProps.onHover
            });

            this.setState({
                layer: layer,
                layerId: layerId
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
