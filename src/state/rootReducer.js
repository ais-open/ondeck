import { combineReducers } from 'redux';
import defaultConfig from './reducers/defaultConfigReducer';
import config from './reducers/configReducer';
import settings from './reducers/settingsReducer';
import data from './reducers/dataReducer';
import stateful from './reducers/statefulReducer';

const rootReducer = combineReducers({
    defaultConfig,
    config,
    settings,
    data,
    stateful
});

export default rootReducer;
