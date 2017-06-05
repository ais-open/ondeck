APP_CONFIG = {
    dataUrl: '/data/rodents.geojson',
    // baseTiles: [
    //     'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // ],
    availableBaseMaps: [{
        name: 'Open Street Map',
        url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }],
    baseTiles: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileSize: 256,
    geoColor: [249, 105, 13],
    pointRadius: 50,
    lineWidth: 20,
    elevation: 1,
    opacity: 0.8,
    bearing: -5, // left/right
    pitch: 35    // up/down
};
