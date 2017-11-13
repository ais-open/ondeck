import * as types from '../actions/layerActionTypes';

export default function layerReducer(state = {}, action) {
    switch (action.type) {
        case types.LAYER__UPDATE_LAYER_SETTINGS:
            return Object.assign({}, state, action.settings);
        default:
            return state;
    }
}
