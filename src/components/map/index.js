import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
//import DeckGL, { GeoJsonLayer } from 'deck.gl';
//import DeckGL, { HexagonLayer } from 'deck.gl';
import Measure from 'react-measure';
import 'whatwg-fetch';

import initialViewport from './initialViewport';
import MapStyles from './MapStyles';
import ODHexagonLayer from './ODHexagonLayer';

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
            // need data in format: [[lng, lat], [lng, lat],...]
            const pts = [];
            data.features.forEach(feature => {
                pts.push(feature.geometry.coordinates);
            });
            //console.log('Points: ' + JSON.stringify(pts));
            this.setState({
                data: pts
            });
        }).catch(error => {
            console.log('Error getting data from ' + dataUrl, error);
        });
    }
    
    componentWillReceiveProps(nextProps) {
        let vp = Object.assign({}, this.state.viewport, {
            bearing: nextProps.configuration.bearing,
            pitch: nextProps.configuration.pitch
        });
        this.setState({
            viewport: vp
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

        const mapStyling = mapStyles.getMapStyling(config);
        const colorRange = config.availableColorRanges[config.colorRange];

        return (
            <Measure onMeasure={this.onResize}>
                <div className="Map">
                    <MapGL
                        {...viewport}
                        width={width}
                        height={height}
                        onChangeViewport={this.onChangeViewport}
                        mapStyle={mapStyling}
                        perspectiveEnabled={true}
                        mapboxApiAccessToken={MAPBOX_TOKEN}>
                        <ODHexagonLayer
                            width={width}
                            height={height}
                            viewport={viewport}
                            colorRange={colorRange}
                            radius={config.radius}
                            data={data || []}
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
