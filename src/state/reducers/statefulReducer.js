import * as types from '../actions/statefulActionTypes';

export default function statefulReducer(state = {}, action) {
    switch (action.type) {
        case types.STATEFUL__UPDATE_STATUS:
            return Object.assign({}, state, action.status);
        default:
            return state;
    }
}
