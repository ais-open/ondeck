import { combineReducers } from 'redux';
import config from './reducers/configReducer';
import settings from './reducers/settingsReducer';
import data from './reducers/dataReducer';

const rootReducer = combineReducers({
    config,
    settings,
    data
});

export default rootReducer;
