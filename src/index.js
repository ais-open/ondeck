/* eslint-disable import/default */ // - This lets us do the configureStore.dev/prod trick
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {blue500, grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import GlobalStore from './globalStore';
import configureStore from './state/store/configureStore';
import StatefulApi from './api/StatefulApi';
import { updateConfig, saveConfig } from './state/actions/configActions';
import { updateSettings } from './state/actions/settingsActions';
import { updateStatefulStatus } from './state/actions/statefulActions';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        accent1Color: grey500
    }
});

const xhttp = new XMLHttpRequest();
let defaultConfig = {};
let store = null;
xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        store = configureStore();
        GlobalStore.setStore(store);
        defaultConfig = JSON.parse(xhttp.responseText);

        // try to return whatever is stored in localStorage
        const saved = localStorage.getItem('ondeck.configuration');
        if (saved) {
            const savedObj = JSON.parse(saved);
            if (savedObj.version && (savedObj.version >= defaultConfig.version)) {
                store.dispatch(updateConfig(savedObj));
                // store settings of current layer to state
                store.dispatch(updateSettings(savedObj.layers[savedObj.layer].settings));
            } else {
                // they have an outdated config, give them the default
                console.log(`Stored version was ${savedObj.version} - upgrading to ${defaultConfig.version}`);
                store.dispatch(updateConfig(defaultConfig));
                store.dispatch(saveConfig(defaultConfig));
                // store settings of current layer to state
                store.dispatch(updateSettings(defaultConfig.layers[defaultConfig.layer].settings));
            }
        } else {
            // it's their first time here, give them the default
            store.dispatch(updateConfig(defaultConfig));
            store.dispatch(saveConfig(defaultConfig));
            // store settings of current layer to state
            store.dispatch(updateSettings(defaultConfig.layers[defaultConfig.layer].settings));
        }

        // store default config for later use
        const c = JSON.stringify(defaultConfig);
        localStorage.setItem('ondeck.default_configuration', c);

        // attempt to reach stateful service before rendering
        let statefulStatus = {
            value: false,
            error: null
        };

        const render = () => {
            store.dispatch(updateStatefulStatus(statefulStatus));
            ReactDOM.render(
                <Provider store={store}>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <App/>
                    </MuiThemeProvider>
                </Provider>, document.getElementById('root')
            );
            registerServiceWorker();
        };

        StatefulApi.getVersion(`${defaultConfig.stateful}/version`).then(() => {
            statefulStatus = {
                value: true,
                error: null
            };
            render();
        }).catch(err => {
            statefulStatus = {
                value: false,
                error: err.message
            };
            render();
        });
    }
};

xhttp.open('GET', `${process.env.PUBLIC_URL}/app-config.json`, true);
xhttp.send();
