import * as types from './settingsActionTypes';

export function updateSettings(settings) {
    return {
        type: types.SETTINGS__UPDATE_SETTINGS,
        settings
    };
}

export function resetSettings() {
    return {
        type: types.SETTINGS__RESET_SETTINGS
    };
}
