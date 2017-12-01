import * as types from '../actions/settingsActionTypes';

export default function settingsReducer(state = {}, action) {
    switch (action.type) {
        case types.SETTINGS__UPDATE_SETTINGS:
            return Object.assign({}, state, action.settings);
        case types.SETTINGS__RESET_SETTINGS:
            return Object.assign({}, state, action.defaultConfig.layers[action.defaultConfig.layer].settings);
        default:
            return state;
    }
}
