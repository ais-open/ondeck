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
import { updateConfig } from './state/actions/configActions';
import { updateLayerSettings } from './state/actions/layerActions';

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

        // store settings of current layer to state
        store.dispatch(updateLayerSettings(defaultConfig.layers[defaultConfig.layer].settings));

        // try to return whatever is stored in localStorage
        const saved = localStorage.getItem('ondeck.configuration');
        if (saved) {
            const savedObj = JSON.parse(saved);
            if (savedObj.version && (savedObj.version >= defaultConfig.version)) {
                store.dispatch(updateConfig(saved));
            } else {
                // they have an outdated config, give them the default
                console.log(`Stored version was ${savedObj.version} - upgrading to ${defaultConfig.version}`);
                store.dispatch(updateConfig(defaultConfig));
            }
        } else {
            // it's their first time here, give them the default
            store.dispatch(updateConfig(defaultConfig));
        }

        // store default config for later use
        const c = JSON.stringify(defaultConfig);
        localStorage.setItem('ondeck.default_configuration', c);

        ReactDOM.render(
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <App/>
                </MuiThemeProvider>
            </Provider>, document.getElementById('root')
        );
        registerServiceWorker();
    }
};

xhttp.open('GET', `${process.env.PUBLIC_URL}/app-config.json`, true);
xhttp.send();
