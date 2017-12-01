import * as types from './statefulActionTypes';

export function updateStatefulStatus(status) {
    return {
        type: types.STATEFUL__UPDATE_STATUS,
        status
    };
}
