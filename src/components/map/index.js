import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
//import DeckGL, { GeoJsonLayer } from 'deck.gl';
import DeckGL, { HexagonLayer } from 'deck.gl';
import Measure from 'react-measure';
import 'whatwg-fetch';

import initialViewport from './initialViewport';
import MapStyles from './MapStyles';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm93bWFubWMiLCJhIjoieE9WenlhayJ9.QFS8jQtCusMhwwVSMQIg9w';

class MapComponent extends React.Component {

    constructor(props) {
        super(props);

        let vp = Object.assign({}, initialViewport, {
            bearing: props.configuration.bearing,
            pitch: props.configuration.pitch
        });

        this.state = {
            viewport: vp,
            width: 0,
            height: 0
        };

        this.onChangeViewport = this.onChangeViewport.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
        const dataUrl = this.props.configuration.dataUrl;
        fetch(dataUrl).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                data: data
            });
        }).catch(error => {
            console.log('Error getting data from ' + dataUrl, error);
        });
    }

    onChangeViewport(newViewport) {
        this.setState({
            viewport: newViewport
        });
    }

    onResize(dimensions) {
        this.setState({
            width: dimensions.width,
            height: dimensions.height
        });
    }

    _initialize(gl) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    render() {
        //console.log('Rendering MapComponent...');
        const config = this.props.configuration;
        const mapStyles = new MapStyles();

        const {data, viewport, width, height} = this.state;
        // GeoJSON layer
        // const layerOpts = Object.assign(mapStyles.getDataStyling(config), {data});
        // const layer = new GeoJsonLayer(layerOpts);
        if (!data) {
            console.log('Data: ' + data);
            return null;
        }
        
        // need data in format: [[lng, lat], [lng, lat],...]
        const pts = [];
        data.features.forEach(feature => {
            pts.push(feature.geometry.coordinates);
        });
        //console.log('Points: ' + JSON.stringify(pts));

        // Hexagon layer
        const colorRange = [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
        ];

        const elevationScale = {
            min: 1,
            max: 5
        };

        const radius = 100;
        const upperPercentile = 100;
        const coverage = 1;
        
        const LIGHT_SETTINGS = {
            lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
            ambientRatio: 0.4,
            diffuseRatio: 0.6,
            specularRatio: 0.2,
            lightsStrength: [0.8, 0.0, 0.8, 0.0],
            numberOfLights: 2
        };

        const layer = new HexagonLayer({
            id: 'heatmap',
            colorRange,
            data: pts,
            elevationRange: [0, 3000],
            elevationScale: elevationScale.max,
            extruded: true,
            getPosition: d => d,
            lightSettings: LIGHT_SETTINGS,
            //onHover: this.props.onHover,
            opacity: 1,
            //pickable: Boolean(this.props.onHover),
            radius,
            upperPercentile
        });
        
        const mapStyling = mapStyles.getMapStyling(config);

        return (
                <Measure onMeasure={this.onResize}>
                    <div className="Map">
                        <MapGL
                            {...viewport}
                            width={width}
                            height={height}
                            onChangeViewport={this.onChangeViewport}
                            mapStyle={mapStyling}
                            mapboxApiAccessToken={MAPBOX_TOKEN}>
                            <DeckGL {...viewport}
                                width={width}
                                height={height}
                                layers={[layer]}
                                onWebGLInitialized={this._initialize}
                            />
                        </MapGL>
                    </div>
                </Measure>
        );
    }
}

MapComponent.propTypes = {
    configuration: PropTypes.object.isRequired
};

export default MapComponent;
