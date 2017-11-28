import { combineReducers } from 'redux';
import config from './reducers/configReducer';
import settings from './reducers/settingsReducer';
import data from './reducers/dataReducer';
import stateful from './reducers/statefulReducer';

const rootReducer = combineReducers({
    config,
    settings,
    data,
    stateful
});

export default rootReducer;
