APP_CONFIG = {
    dataUrl: '/data/rodents.geojson',
    // baseTiles: [
    //     'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // ],
    availableBaseMaps: [{
        name: 'Open Street Map',
        url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }, {
        name: 'Awesome Tiles',
        url: 'http://foo.bar.baz.com/{z}/{x}/{y}.png'
    }],
    baseTiles: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    availableColorRanges: {
        'White2Red': [
            [255, 255, 178],
            [254, 217, 118],
            [254, 178, 76],
            [253, 141, 60],
            [240, 59, 32],
            [189, 0, 38]
        ],
        'Blue2Red': [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
        ]
    },
    colorRange: 'Blue2Red',
    tileSize: 256,
    geoColor: [249, 105, 13],
    pointRadius: 50,
    lineWidth: 20,
    elevation: 1,
    opacity: 0.8,
    bearing: -5, // left/right
    pitch: 35    // up/down
};
