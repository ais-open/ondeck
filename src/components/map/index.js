import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Measure from 'react-measure';
import 'whatwg-fetch';

import initialViewport from './initialViewport';
import MapStyles from './MapStyles';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm93bWFubWMiLCJhIjoieE9WenlhayJ9.QFS8jQtCusMhwwVSMQIg9w';

class MapComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewport: initialViewport,
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

    render() {
        console.log('Rendering MapComponent...');
        const config = this.props.configuration;
        const mapStyles = new MapStyles();

        const {data, viewport, width, height} = this.state;
        const layerOpts = Object.assign(mapStyles.getDataStyling(config), {data});
        const layer = new GeoJsonLayer(layerOpts);
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
