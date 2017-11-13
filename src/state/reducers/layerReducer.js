import * as types from '../actions/layerActionTypes';

export default function layerReducer(state = {}, action) {
    switch (action.type) {
        case types.LAYER__UPDATE_LAYER_SETTINGS:
            return Object.assign({}, state, action.settings);
        case types.LAYER__RESET_LAYER_SETTINGS:
            const defaultConfig = JSON.parse(localStorage.getItem('ondeck.default_configuration'));
            return Object.assign({}, state, defaultConfig.layers[defaultConfig.layer].settings);
        default:
            return state;
    }
}
