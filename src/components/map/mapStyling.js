import {fromJS} from 'immutable';


export const TILES = fromJS({
    'version': 8,
    'sources': {
        'raster-tiles': {
            'type': 'raster',
            'tiles': APP_CONFIG.baseTiles,
            'tileSize': 256
        }
    },
    'layers': [{
        'id': 'raster-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 18
    }]
});

export default TILES;

/*
Some Free Providers for development:

'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png'

'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png' -- these guys don't have cors setup on their server
'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
*/
