import * as types from './configActionTypes';

export function updateConfig(config) {
    return {
        type: types.CONFIG__UPDATE_CONFIG,
        config
    };
}

export function saveConfig(config) {
    return {
        type: types.CONFIG__SAVE_CONFIG,
        config
    }
}
