import * as types from '../actions/defaultConfigActionTypes';

export default function defaultConfigReducer(state = {}, action) {
    switch (action.type) {
        case types.DEFAULT_CONFIG__SET_DEFAULT_CONFIG:
            return action.defaultConfig;
        default:
            return state;
    }
}
