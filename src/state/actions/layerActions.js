import * as types from './layerActionTypes';

export function updateLayerSettings(settings) {
    return {
        type: types.LAYER__UPDATE_LAYER_SETTINGS,
        settings
    };
}
