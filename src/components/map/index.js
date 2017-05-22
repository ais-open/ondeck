import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Measure from 'react-measure';
import 'whatwg-fetch';

import initialViewport from './initialViewport';
import dataStyling from './dataStyling';
import mapStyling from './mapStyling';


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
        const dataUrl = APP_CONFIG.dataUrl;
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

        const {data, viewport, width, height} = this.state;
        const layerOpts = Object.assign(dataStyling, {data});
        const layer = new GeoJsonLayer(layerOpts);

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

export default MapComponent;
