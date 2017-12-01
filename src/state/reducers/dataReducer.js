import * as types from '../actions/dataActionTypes';

export default function dataReducer(state = {}, action) {
    switch (action.type) {
        case types.DATA__FETCH_DATA_PENDING:
            return Object.assign({}, action.data, {pending: true});
        case types.DATA__FETCH_DATA_SUCCESS:
            return Object.assign({}, action.data, {pending: false});
        case types.DATA__FETCH_DATA_ERROR:
            return Object.assign({}, {pending: false, error: action.error});
        case types.DATA__UPDATE_DATA:
            return Object.assign({}, action.data, {pending: false});
        default:
            return state;
    }
}
