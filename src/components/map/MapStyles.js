

export default class MapStyles {

    getDataStyling(config) {
        return {
            id: 'geojson-layer',
            filled: true,
            stroked: false,
            extruded: false,
            opacity: config.opacity,
            getFillColor: () => config.geoColor,
            getElevation: () => config.elevation,
            getLineColor: () => config.geoColor,
            getLineWidth: () => config.lineWidth,
            getRadius: () => config.pointRadius
        };
    }

    getMapStyling(config) {
        return config.baseMap;
        //return 'http://localhost:8080/styles/planet-darkbox.json';
        // return fromJS({
        //     'version': 8,
        //     'sources': {
        //         'raster-tiles': {
        //             'type': 'raster',
        //             'tiles': [config.baseTiles],
        //             'tileSize': config.tileSize
        //         }
        //     },
        //     'layers': [{
        //         'id': 'raster-tiles',
        //         'type': 'raster',
        //         'source': 'raster-tiles',
        //         'minzoom': 0,
        //         'maxzoom': 18
        //     }]
        // });
    }
}
