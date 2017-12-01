import * as types from '../actions/configActionTypes';

export default function configReducer(state = {}, action) {
    switch (action.type) {
        case types.CONFIG__UPDATE_CONFIG:
            return Object.assign({}, state, action.config);
        case types.CONFIG__SAVE_CONFIG:
            const c = JSON.stringify(action.config);
            localStorage.setItem('ondeck.configuration', c);
            return action.config;
        default:
            return state;
    }
}
