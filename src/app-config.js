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
        'Blues_3Classes': [
            [222,235,247],
            [158,202,225],
            [49,130,189]
        ],
        'Blues_7Classes': [
            [239,243,255],
            [198,219,239],
            [158,202,225],
            [107,174,214],
            [66,146,198],
            [33,113,181],
            [8,69,148]
        ],
        'Oranges_3Classes': [
            [254,230,206],
            [253,174,107],
            [230,85,13]
        ],
        'Oranges_7Classes': [
            [254,237,222],
            [253,208,162],
            [253,174,107],
            [253,141,60],
            [241,105,19],
            [217,72,1],
            [140,45,4]
        ],
        'Reds_3Classes': [
            [254,224,210],
            [252,146,114],
            [222,45,38]
        ],
        'Reds_7Classes': [
            [254,229,217],
            [252,187,161],
            [252,146,114],
            [251,106,74],
            [239,59,44],
            [203,24,29],
            [153,0,13]
        ],
        'Yellow2Blue_3Classes': [
            [237,248,177],
            [127,205,187],
            [44,127,184]
        ],
        'Yellow2Blue_7Classes': [
            [255,255,204],
            [199,233,180],
            [127,205,187],
            [65,182,196],
            [29,145,192],
            [34,94,168],
            [12,44,132]
        ],
        'Yellow2Red_3Classes': [
            [255,237,160],
            [254,178,76],
            [240,59,32]
        ],
        'Yellow2Red_7Classes': [
            [255,255,178],
            [254,217,118],
            [254,178,76],
            [253,141,60],
            [252,78,42],
            [227,26,28],
            [177,0,38]
        ]
    },
    colorRange: 'Yellow2Red_3Classes',
    tileSize: 256,
    geoColor: [249, 105, 13],
    pointRadius: 50,
    lineWidth: 20,
    elevation: 1,
    opacity: 0.8,
    bearing: -5, // left/right
    pitch: 35    // up/down
};
