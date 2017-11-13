import { combineReducers } from 'redux';
import config from './reducers/configReducer';
import layer from './reducers/layerReducer';
import data from './reducers/dataReducer';

const rootReducer = combineReducers({
    config,
    layer,
    data
});

export default rootReducer;
