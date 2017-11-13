import * as types from './layerActionTypes';

export function updateLayerSettings(settings) {
    return {
        type: types.LAYER__UPDATE_LAYER_SETTINGS,
        settings
    };
}

export function resetLayerSettings() {
    return {
        type: types.LAYER__RESET_LAYER_SETTINGS
    };
}
