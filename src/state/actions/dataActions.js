import * as types from './dataActionTypes';
import DataApi from '../../dataApi';

function fetchPending(data) {
    return {
        type: types.DATA__FETCH_DATA_PENDING,
        data
    };
}

function fetchSuccess(data) {
    return {
        type: types.DATA__FETCH_DATA_SUCCESS,
        data
    };
}

export function fetchData(url) {
    return (dispatch) => {
        dispatch(fetchPending({}));
        return DataApi.fetchData(url).then(data => {
            dispatch(fetchSuccess(data));
        }).catch(error => {
            throw(error);
        });
    };
}
