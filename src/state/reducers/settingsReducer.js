import * as types from '../actions/settingsActionTypes';

export default function settingsReducer(state = {}, action) {
    switch (action.type) {
        case types.SETTINGS__UPDATE_SETTINGS:
            return Object.assign({}, state, action.settings);
        case types.SETTINGS__RESET_SETTINGS:
            const defaultConfig = JSON.parse(localStorage.getItem('ondeck.default_configuration'));
            return Object.assign({}, state, defaultConfig.layers[defaultConfig.layer].settings);
        default:
            return state;
    }
}
