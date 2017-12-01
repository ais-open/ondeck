import * as types from './defaultConfigActionTypes';

export function setDefaultConfig(defaultConfig) {
    return {
        type: types.DEFAULT_CONFIG__SET_DEFAULT_CONFIG,
        defaultConfig
    };
}
